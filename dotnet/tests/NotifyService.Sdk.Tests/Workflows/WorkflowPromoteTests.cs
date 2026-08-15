using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests.Workflows;

public class WorkflowPromoteTests
{
    private static string PromotionResultBody(
        bool applied = true,
        string status = "new",
        int? targetVersion = 1) => $$"""
        {
          "applied": {{(applied ? "true" : "false")}},
          "status": "{{status}}",
          "template_diff": null,
          "workflow_diff": {
            "key": "invoice_paid",
            "status": "{{status}}",
            "name": "unchanged",
            "description": "added",
            "body": "modified",
            "source_version": 2,
            "target_current_version": null,
            "referenced_templates": [
              {
                "key": "invoice_template",
                "status": "new",
                "name": "unchanged",
                "bodies": []
              }
            ]
          },
          "target_version": {{(targetVersion.HasValue ? targetVersion.Value.ToString() : "null")}}
        }
        """;

    [Fact]
    public async Task PromoteAsync_sends_POST_to_promote_path()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        PromotionResult result = await client.Workflows.PromoteAsync("invoice_paid");

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/workflows/invoice_paid/promote");
    }

    [Fact]
    public async Task PromoteAsync_serializes_dry_run_false_by_default()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PromoteAsync("invoice_paid");

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("dry_run").GetBoolean().Should().BeFalse();
    }

    [Fact]
    public async Task PromoteAsync_serializes_dry_run_true_when_requested()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody(applied: false, targetVersion: null));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PromoteAsync("invoice_paid", dryRun: true);

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("dry_run").GetBoolean().Should().BeTrue();
    }

    [Fact]
    public async Task PromoteAsync_omits_include_templates_when_null()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PromoteAsync("invoice_paid");

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.TryGetProperty("include_templates", out _).Should().BeFalse();
    }

    [Fact]
    public async Task PromoteAsync_serializes_include_templates_when_supplied()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PromoteAsync(
            "invoice_paid",
            includeTemplates: ["invoice_template", "footer_template"]);

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        JsonElement arr = doc.RootElement.GetProperty("include_templates");
        arr.GetArrayLength().Should().Be(2);
        arr[0].GetString().Should().Be("invoice_template");
        arr[1].GetString().Should().Be("footer_template");
    }

    [Fact]
    public async Task PromoteAsync_deserializes_promotion_result()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody(applied: true, status: "new", targetVersion: 1));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        PromotionResult result = await client.Workflows.PromoteAsync("invoice_paid");

        result.Applied.Should().BeTrue();
        result.Status.Should().Be("new");
        result.TargetVersion.Should().Be(1);
        result.TemplateDiff.Should().BeNull();

        result.WorkflowDiff.Should().NotBeNull();
        result.WorkflowDiff!.Key.Should().Be("invoice_paid");
        result.WorkflowDiff.Status.Should().Be("new");
        result.WorkflowDiff.Name.Should().Be("unchanged");
        result.WorkflowDiff.Description.Should().Be("added");
        result.WorkflowDiff.Body.Should().Be("modified");
        result.WorkflowDiff.SourceVersion.Should().Be(2);
        result.WorkflowDiff.TargetCurrentVersion.Should().BeNull();
        result.WorkflowDiff.ReferencedTemplates.Should().HaveCount(1);
        result.WorkflowDiff.ReferencedTemplates[0].Key.Should().Be("invoice_template");
    }

    [Fact]
    public async Task PromoteAsync_url_encodes_key_with_special_characters()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Workflows.PromoteAsync("key with spaces");

        handler.SentRequests[0].RequestUri!.AbsolutePath
            .Should().Be("/v1/workflows/key%20with%20spaces/promote");
    }
}
