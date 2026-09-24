using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests.Templates;

public class TemplatesPromoteTests
{
    private static string PromotionResultBody(
        bool applied = true,
        string status = "changed") => $$"""
        {
          "applied": {{(applied ? "true" : "false")}},
          "status": "{{status}}",
          "template_diff": {
            "key": "welcome_email",
            "status": "{{status}}",
            "name": "unchanged",
            "bodies": [
              {
                "channel": "email",
                "subject": "modified",
                "text": "unchanged",
                "html": "modified",
                "structured": "unchanged"
              }
            ]
          },
          "workflow_diff": null,
          "target_version": 3
        }
        """;

    [Fact]
    public async Task PromoteAsync_sends_POST_to_promote_path()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        PromotionResult result = await client.Templates.PromoteAsync("welcome_email");

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/templates/welcome_email/promote");
    }

    [Fact]
    public async Task PromoteAsync_serializes_dry_run_false_by_default()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Templates.PromoteAsync("welcome_email");

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("dry_run").GetBoolean().Should().BeFalse();
    }

    [Fact]
    public async Task PromoteAsync_serializes_dry_run_true_when_requested()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody(applied: false));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Templates.PromoteAsync("welcome_email", dryRun: true);

        string body = await handler.SentRequests[0].Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("dry_run").GetBoolean().Should().BeTrue();
    }

    [Fact]
    public async Task PromoteAsync_deserializes_promotion_result()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody(applied: true, status: "changed"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        PromotionResult result = await client.Templates.PromoteAsync("welcome_email");

        result.Applied.Should().BeTrue();
        result.Status.Should().Be("changed");
        result.TargetVersion.Should().Be(3);
        result.WorkflowDiff.Should().BeNull();

        result.TemplateDiff.Should().NotBeNull();
        result.TemplateDiff!.Key.Should().Be("welcome_email");
        result.TemplateDiff.Status.Should().Be("changed");
        result.TemplateDiff.Name.Should().Be("unchanged");
        result.TemplateDiff.Bodies.Should().HaveCount(1);
        result.TemplateDiff.Bodies[0].Channel.Should().Be("email");
        result.TemplateDiff.Bodies[0].Subject.Should().Be("modified");
        result.TemplateDiff.Bodies[0].Html.Should().Be("modified");
        result.TemplateDiff.Bodies[0].Text.Should().Be("unchanged");
    }

    [Fact]
    public async Task PromoteAsync_url_encodes_key_with_special_characters()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PromotionResultBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Templates.PromoteAsync("key with spaces");

        handler.SentRequests[0].RequestUri!.AbsolutePath
            .Should().Be("/v1/templates/key%20with%20spaces/promote");
    }
}
