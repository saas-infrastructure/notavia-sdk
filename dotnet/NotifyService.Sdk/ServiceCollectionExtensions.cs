using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;
using Microsoft.Extensions.Options;
using NotifyService.Sdk.Identity;
using NotifyService.Sdk.Internal;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.SenderDomains;
using NotifyService.Sdk.Suppressions;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Usage;
using NotifyService.Sdk.Workflows;

namespace NotifyService.Sdk;

/// <summary>Extension methods for registering the NotifyService SDK with DI.</summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers <see cref="INotifyClient"/> reading options from the given
    /// configuration section (default name: <c>"NotifyService"</c>).
    /// </summary>
    /// <param name="services">The service collection.</param>
    /// <param name="config">Configuration root.</param>
    /// <param name="sectionName">Section to bind. Defaults to "NotifyService".</param>
    public static IServiceCollection AddNotifyClient(
        this IServiceCollection services,
        IConfiguration config,
        string sectionName = "NotifyService")
    {
        services.AddOptions<NotifyOptions>()
            .Bind(config.GetSection(sectionName))
            .Validate(o => !string.IsNullOrEmpty(o.ApiKey), "NotifyOptions.ApiKey is required.")
            .Validate(o => Uri.TryCreate(o.BaseUrl, UriKind.Absolute, out _), "NotifyOptions.BaseUrl must be an absolute URI.")
            .ValidateOnStart();

        return AddInternal(services);
    }

    /// <summary>Registers <see cref="INotifyClient"/> with options configured by the delegate.</summary>
    /// <param name="services">The service collection.</param>
    /// <param name="configure">Delegate that configures <see cref="NotifyOptions"/>.</param>
    public static IServiceCollection AddNotifyClient(
        this IServiceCollection services,
        Action<NotifyOptions> configure)
    {
        services.AddOptions<NotifyOptions>()
            .Configure(configure)
            .Validate(o => !string.IsNullOrEmpty(o.ApiKey), "NotifyOptions.ApiKey is required.")
            .Validate(o => Uri.TryCreate(o.BaseUrl, UriKind.Absolute, out _), "NotifyOptions.BaseUrl must be an absolute URI.")
            .ValidateOnStart();

        return AddInternal(services);
    }

    private static IServiceCollection AddInternal(IServiceCollection services)
    {
        services.AddTransient<ApiKeyAuthHandler>();

        IHttpClientBuilder builder = services.AddHttpClient<NotifyHttpClient>((sp, http) =>
        {
            NotifyOptions opts = sp.GetRequiredService<IOptions<NotifyOptions>>().Value;
            http.BaseAddress = new Uri(opts.BaseUrl, UriKind.Absolute);
            http.Timeout = opts.Timeout;
            string version = typeof(NotifyClient).Assembly.GetName().Version?.ToString() ?? "1.0.0";
            http.DefaultRequestHeaders.UserAgent.ParseAdd($"NotifyService.Sdk/{version}");
        })
        .AddHttpMessageHandler<ApiKeyAuthHandler>();

        builder.AddStandardResilienceHandler().Configure((options, serviceProvider) =>
        {
            RetryOptions retries = serviceProvider
                .GetRequiredService<IOptionsMonitor<NotifyOptions>>()
                .CurrentValue.Retries;

            if (!retries.Enabled)
            {
                options.Retry.ShouldHandle = _ => ValueTask.FromResult(false);
            }
            else
            {
                options.Retry.MaxRetryAttempts = retries.MaxAttempts;
            }
        });

        services.AddTransient<INotificationsResource, NotificationsResource>();
        services.AddTransient<ITemplatesResource, TemplatesResource>();
        services.AddTransient<IMeResource, MeResource>();
        services.AddTransient<ISuppressionsResource, SuppressionsResource>();
        services.AddTransient<IUsageResource, UsageResource>();
        services.AddTransient<ISenderDomainsResource, SenderDomainsResource>();
        services.AddTransient<NotifyServiceWorkflowsClient>(
            sp => new NotifyServiceWorkflowsClient(sp.GetRequiredService<NotifyHttpClient>()));
        services.AddTransient<INotifyClient, NotifyClient>();

        return services;
    }
}
