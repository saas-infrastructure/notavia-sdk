using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;

namespace NotifyService.Sdk.Tests.Helpers;

internal static class TestServiceCollectionBuilder
{
    public static (IServiceProvider Sp, RecordingHandler Handler) Build(
        Action<NotifyOptions>? configure = null)
    {
        var services = new ServiceCollection();
        var handler = new RecordingHandler();

        services.AddNotifyClient(opts =>
        {
            opts.BaseUrl = "http://localhost/";
            opts.ApiKey = "ns_test_local";
            opts.Retries = new RetryOptions { Enabled = false };
            configure?.Invoke(opts);
        });

        services.AddHttpClient<NotifyService.Sdk.Internal.NotifyHttpClient>()
            .ConfigurePrimaryHttpMessageHandler(() => handler);

        IServiceProvider sp = services.BuildServiceProvider();
        return (sp, handler);
    }
}
