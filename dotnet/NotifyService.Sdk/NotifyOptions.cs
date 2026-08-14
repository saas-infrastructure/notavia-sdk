namespace NotifyService.Sdk;

/// <summary>Configures the NotifyService client.</summary>
public sealed class NotifyOptions
{
    /// <summary>The NotifyService API base URL, e.g. <c>https://api.notavia.saas-infrastructure.com</c>.</summary>
    public string BaseUrl { get; set; } = "https://api.notavia.saas-infrastructure.com";

    /// <summary>A NotifyService API key (Secret scope).</summary>
    public string ApiKey { get; set; } = "";

    /// <summary>Per-request timeout. Defaults to 30 seconds.</summary>
    public TimeSpan Timeout { get; set; } = TimeSpan.FromSeconds(30);

    /// <summary>Retry policy applied to transient HTTP failures.</summary>
    public RetryOptions Retries { get; set; } = new();
}

/// <summary>
/// Controls the retry behavior applied to transient HTTP failures
/// (5xx, 408, 429, and <see cref="HttpRequestException"/>).
/// </summary>
public sealed class RetryOptions
{
    /// <summary>Whether retries are enabled. Defaults to <c>true</c>.</summary>
    public bool Enabled { get; set; } = true;

    /// <summary>
    /// Maximum number of retries beyond the first request. Default 3, so up
    /// to 4 total outgoing requests per call.
    /// </summary>
    public int MaxAttempts { get; set; } = 3;
}
