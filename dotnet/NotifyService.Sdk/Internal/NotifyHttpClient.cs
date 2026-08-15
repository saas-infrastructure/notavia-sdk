using System.Diagnostics;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace NotifyService.Sdk.Internal;

internal sealed class NotifyHttpClient
{
    private readonly HttpClient _http;

    private static readonly JsonSerializerOptions RelaxedWithFallback = new(
        JsonSerializerDefaults.General)
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        TypeInfoResolver = JsonTypeInfoResolver.Combine(
            NotifyJsonContext.Relaxed,
            new DefaultJsonTypeInfoResolver()),
    };

    public NotifyHttpClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<TResponse> GetAsync<TResponse>(
        string path,
        JsonTypeInfo<TResponse> responseInfo,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "GET");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Get, path);
        using HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            await ErrorTranslator.ThrowAsync(response, ct);
        }

        TResponse? body = await response.Content.ReadFromJsonAsync(responseInfo, ct);
        return body ?? throw new InvalidOperationException("Empty response body.");
    }

    public async Task<(HttpResponseMessage Response, TResponse Body)> PostAsync<TRequest, TResponse>(
        string path,
        TRequest body,
        JsonTypeInfo<TRequest> requestInfo,
        JsonTypeInfo<TResponse> responseInfo,
        IReadOnlyDictionary<string, string>? extraHeaders,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "POST");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Post, path);
        request.Content = SerializeRelaxed(body, requestInfo);
        if (extraHeaders is not null)
        {
            foreach ((string name, string value) in extraHeaders)
            {
                request.Headers.TryAddWithoutValidation(name, value);
            }
        }

        HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            try
            {
                await ErrorTranslator.ThrowAsync(response, ct);
            }
            finally
            {
                response.Dispose();
            }
        }

        TResponse? parsed = await response.Content.ReadFromJsonAsync(responseInfo, ct);
        return (response, parsed ?? throw new InvalidOperationException("Empty response body."));
    }

    public async Task<TResponse> PatchAsync<TRequest, TResponse>(
        string path,
        TRequest body,
        JsonTypeInfo<TRequest> requestInfo,
        JsonTypeInfo<TResponse> responseInfo,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "PATCH");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Patch, path);
        request.Content = SerializeRelaxed(body, requestInfo);

        using HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            await ErrorTranslator.ThrowAsync(response, ct);
        }

        TResponse? parsed = await response.Content.ReadFromJsonAsync(responseInfo, ct);
        return parsed ?? throw new InvalidOperationException("Empty response body.");
    }

    public async Task PostVoidAsync(
        string path,
        IReadOnlyDictionary<string, string>? headers,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "POST");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Post, path);
        if (headers is not null)
        {
            foreach ((string name, string value) in headers)
            {
                request.Headers.TryAddWithoutValidation(name, value);
            }
        }

        using HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            await ErrorTranslator.ThrowAsync(response, ct);
        }
    }

    public async Task PostVoidAsync<TRequest>(
        string path,
        TRequest body,
        IReadOnlyDictionary<string, string>? headers,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "POST");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Post, path);
        request.Content = SerializeWithFallback(body);
        if (headers is not null)
        {
            foreach ((string name, string value) in headers)
            {
                request.Headers.TryAddWithoutValidation(name, value);
            }
        }

        using HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            await ErrorTranslator.ThrowAsync(response, ct);
        }
    }

    public async Task<(HttpResponseMessage Response, TResponse Body)> PostWithFallbackAsync<TRequest, TResponse>(
        string path,
        TRequest body,
        JsonTypeInfo<TResponse> responseInfo,
        IReadOnlyDictionary<string, string>? extraHeaders,
        string activityName,
        CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "POST");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Post, path);
        request.Content = SerializeWithFallback(body);
        if (extraHeaders is not null)
        {
            foreach ((string name, string value) in extraHeaders)
            {
                request.Headers.TryAddWithoutValidation(name, value);
            }
        }

        HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            try
            {
                await ErrorTranslator.ThrowAsync(response, ct);
            }
            finally
            {
                response.Dispose();
            }
        }

        TResponse? parsed = await response.Content.ReadFromJsonAsync(responseInfo, ct);
        return (response, parsed ?? throw new InvalidOperationException("Empty response body."));
    }

    public async Task DeleteAsync(string path, string activityName, CancellationToken ct)
    {
        using Activity? activity = Telemetry.Source.StartActivity(activityName, ActivityKind.Client);
        activity?.SetTag("http.method", "DELETE");
        activity?.SetTag("url.path", path);

        using var request = new HttpRequestMessage(HttpMethod.Delete, path);
        using HttpResponseMessage response = await _http.SendAsync(request, ct);
        RecordResponse(activity, response);

        if (!response.IsSuccessStatusCode)
        {
            await ErrorTranslator.ThrowAsync(response, ct);
        }
    }

    internal static StringContent SerializeWithFallback<T>(T value)
    {
        string json = JsonSerializer.Serialize(value, RelaxedWithFallback);
        return new StringContent(json, Encoding.UTF8, "application/json");
    }

    private static StringContent SerializeRelaxed<T>(T value, JsonTypeInfo<T> _)
    {
        JsonTypeInfo<T> relaxedInfo = (JsonTypeInfo<T>)NotifyJsonContext.Relaxed.GetTypeInfo(typeof(T))!;
        string json = JsonSerializer.Serialize(value, relaxedInfo);
        return new StringContent(json, Encoding.UTF8, "application/json");
    }

    private static void RecordResponse(Activity? activity, HttpResponseMessage response)
    {
        if (activity is null) return;
        activity.SetTag("http.status_code", (int)response.StatusCode);
        if (response.Headers.TryGetValues("X-Request-Id", out var ids))
        {
            string? rid = ids.FirstOrDefault();
            if (rid is not null)
            {
                activity.SetTag("notifyservice.request_id", rid);
            }
        }
        if (!response.IsSuccessStatusCode)
        {
            activity.SetStatus(ActivityStatusCode.Error);
        }
    }
}
