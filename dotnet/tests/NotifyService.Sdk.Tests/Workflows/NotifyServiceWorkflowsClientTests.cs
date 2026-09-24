using System.Net;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Tests.Helpers;
using NotifyService.Sdk.Workflows;

namespace NotifyService.Sdk.Tests.Workflows;

public class NotifyServiceWorkflowsClientTests
{
    private const string RunId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

    private static string RunBody(string status) => $$"""
        {
          "id": "{{RunId}}",
          "workflow_key": "invoice_paid",
          "version": 1,
          "status": "{{status}}",
          "current_step_id": null,
          "trigger_data": "{}",
          "source": "Production",
          "created_at": "2026-05-28T10:00:00+00:00",
          "completed_at": null,
          "failure_reason": null,
          "steps": []
        }
        """;

    [Fact]
    public async Task TriggerAsync_sends_POST_with_Idempotency_Key_header()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.Accepted,
            """{ "run_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "status": "Pending" }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        WorkflowTriggerResponse result = await client.Workflows.TriggerAsync(
            "invoice_paid",
            new WorkflowTriggerRequest(new { invoice_id = "inv_42" }),
            idempotencyKey: "idem-test-001");

        result.RunId.Should().Be(Guid.Parse(RunId));
        result.Status.Should().Be("Pending");

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/workflows/invoice_paid/trigger");
        req.Headers.GetValues("Idempotency-Key").Should().ContainSingle().Which.Should().Be("idem-test-001");

        string body = await req.Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("trigger_data").ValueKind.Should().NotBe(JsonValueKind.Undefined);
    }

    [Fact]
    public async Task TriggerAsync_omits_Idempotency_Key_when_not_supplied()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.Accepted,
            """{ "run_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "status": "Pending" }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.TriggerAsync("invoice_paid", new WorkflowTriggerRequest(new { }));

        handler.SentRequests[0].Headers.Contains("Idempotency-Key").Should().BeFalse();
    }

    [Fact]
    public async Task WaitForCompletionAsync_polls_until_terminal()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();

        handler.Respond(HttpStatusCode.OK, RunBody("Running"));
        handler.Respond(HttpStatusCode.OK, RunBody("Running"));
        handler.Respond(HttpStatusCode.OK, RunBody("Completed"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        WorkflowRunResponse result = await client.Workflows.WaitForCompletionAsync(
            Guid.Parse(RunId),
            timeout: TimeSpan.FromSeconds(30),
            pollInterval: TimeSpan.FromMilliseconds(50));

        result.Status.Should().Be("Completed");
        result.Id.Should().Be(Guid.Parse(RunId));
        handler.SentRequests.Should().HaveCount(3);
    }

    [Fact]
    public async Task WaitForCompletionAsync_throws_TimeoutException_when_deadline_exceeded()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();

        for (int i = 0; i < 20; i++)
        {
            handler.Respond(HttpStatusCode.OK, RunBody("Running"));
        }

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        Func<Task> act = () => client.Workflows.WaitForCompletionAsync(
            Guid.Parse(RunId),
            timeout: TimeSpan.FromMilliseconds(150),
            pollInterval: TimeSpan.FromMilliseconds(50));

        await act.Should().ThrowAsync<TimeoutException>();
    }

    [Fact]
    public async Task WaitForCompletionAsync_throws_TimeoutException_when_the_deadline_expires_during_a_poll_request()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();

        handler.ResponseDelay = TimeSpan.FromSeconds(5);
        handler.Respond(HttpStatusCode.OK, RunBody("Running"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        Func<Task> act = () => client.Workflows.WaitForCompletionAsync(
            Guid.Parse(RunId),
            timeout: TimeSpan.FromMilliseconds(100),
            pollInterval: TimeSpan.FromMilliseconds(50));

        await act.Should().ThrowAsync<TimeoutException>();
    }

    [Fact]
    public async Task WaitForCompletionAsync_surfaces_caller_cancellation_when_the_caller_cancels_during_a_poll_request()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();

        handler.ResponseDelay = TimeSpan.FromSeconds(5);
        handler.Respond(HttpStatusCode.OK, RunBody("Running"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        using var caller = new CancellationTokenSource(TimeSpan.FromMilliseconds(100));

        Func<Task> act = () => client.Workflows.WaitForCompletionAsync(
            Guid.Parse(RunId),
            timeout: TimeSpan.FromMinutes(5),
            pollInterval: TimeSpan.FromMilliseconds(50),
            ct: caller.Token);

        await act.Should().ThrowAsync<OperationCanceledException>();
    }

    [Fact]
    public async Task WaitForCompletionAsync_surfaces_caller_cancellation_when_the_caller_cancels_between_polls()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();

        for (int i = 0; i < 40; i++)
        {
            handler.Respond(HttpStatusCode.OK, RunBody("Running"));
        }

        INotifyClient client = sp.GetRequiredService<INotifyClient>();

        using var caller = new CancellationTokenSource(TimeSpan.FromMilliseconds(150));

        Func<Task> act = () => client.Workflows.WaitForCompletionAsync(
            Guid.Parse(RunId),
            timeout: TimeSpan.FromMinutes(5),
            pollInterval: TimeSpan.FromMilliseconds(50),
            ct: caller.Token);

        await act.Should().ThrowAsync<OperationCanceledException>();
    }

    [Fact]
    public async Task CancelRunAsync_sends_POST_cancel()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Accepted, """{ "status": "Cancelling" }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.CancelRunAsync(Guid.Parse(RunId));

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be($"/v1/workflows/runs/{RunId}/cancel");
    }

    [Fact]
    public async Task PostRunEventAsync_sends_POST_with_event_body()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Accepted, """{ "awoken": 1 }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PostRunEventAsync(
            Guid.Parse(RunId),
            "payment_confirmed",
            new { transaction_id = "txn_99" });

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be($"/v1/workflows/runs/{RunId}/events");

        string body = await req.Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("event").GetString().Should().Be("payment_confirmed");
        doc.RootElement.GetProperty("data").ValueKind.Should().NotBe(JsonValueKind.Undefined);
    }

    [Fact]
    public async Task PostWorkflowEventAsync_sends_POST_to_workflow_key_events()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Accepted, """{ "awoken": 2 }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PostWorkflowEventAsync("invoice_paid", "invoice_voided");

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/workflows/invoice_paid/events");

        string body = await req.Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("event").GetString().Should().Be("invoice_voided");
    }
}
