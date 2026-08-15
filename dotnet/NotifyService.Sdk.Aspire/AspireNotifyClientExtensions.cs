using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotifyService.Sdk;

namespace NotifyService.Sdk.Aspire;

/// <summary>
/// Aspire integration: register <see cref="INotifyClient"/> from a connection string.
/// </summary>
public static class AspireNotifyClientExtensions
{
    /// <summary>
    /// Registers <see cref="INotifyClient"/> reading the named Aspire connection string.
    /// Connection string format: <c>"Endpoint=https://api.notavia.saas-infrastructure.com;ApiKey=ns_..."</c>.
    /// </summary>
    /// <param name="builder">The host application builder.</param>
    /// <param name="connectionName">Connection string name in configuration. Defaults to "notifyservice".</param>
    /// <param name="configureOptions">Optional post-binding configuration hook.</param>
    public static IHostApplicationBuilder AddNotifyClient(
        this IHostApplicationBuilder builder,
        string connectionName = "notifyservice",
        Action<NotifyOptions>? configureOptions = null)
    {
        string? cs = builder.Configuration.GetConnectionString(connectionName);
        if (string.IsNullOrEmpty(cs))
        {
            throw new InvalidOperationException(
                $"Connection string '{connectionName}' is missing. Expected format: 'Endpoint=...;ApiKey=...'.");
        }

        (string endpoint, string apiKey) = ParseConnectionString(cs);

        builder.Services.AddNotifyClient(opts =>
        {
            opts.BaseUrl = endpoint;
            opts.ApiKey = apiKey;
            configureOptions?.Invoke(opts);
        });
        return builder;
    }

    internal static (string Endpoint, string ApiKey) ParseConnectionString(string cs)
    {
        string? endpoint = null;
        string? apiKey = null;
        foreach (string pair in cs.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            int eq = pair.IndexOf('=');
            if (eq <= 0)
            {
                throw new ArgumentException($"Malformed connection-string segment: '{pair}'.");
            }
            string key = pair.Substring(0, eq).Trim();
            string value = pair.Substring(eq + 1).Trim();
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException($"Empty value for key '{key}'.");
            }

            if (key.Equals("Endpoint", StringComparison.OrdinalIgnoreCase))
            {
                endpoint = value;
            }
            else if (key.Equals("ApiKey", StringComparison.OrdinalIgnoreCase))
            {
                apiKey = value;
            }
            else
            {
                throw new ArgumentException($"Unknown connection-string key '{key}'. Expected 'Endpoint' or 'ApiKey'.");
            }
        }

        if (string.IsNullOrEmpty(endpoint))
        {
            throw new ArgumentException("Connection string is missing required key 'Endpoint'.");
        }
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new ArgumentException("Connection string is missing required key 'ApiKey'.");
        }
        return (endpoint, apiKey);
    }
}
