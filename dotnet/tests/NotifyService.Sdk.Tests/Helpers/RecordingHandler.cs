using System.Net;
using System.Text;

namespace NotifyService.Sdk.Tests.Helpers;

internal sealed class RecordingHandler : HttpMessageHandler
{
    public List<HttpRequestMessage> SentRequests { get; } = new();
    public Queue<Func<HttpRequestMessage, HttpResponseMessage>> Responders { get; } = new();
    public TimeSpan ResponseDelay { get; set; } = TimeSpan.Zero;

    public bool BlockUntilCancelled { get; set; }

    public void Respond(HttpStatusCode status, string body, string contentType = "application/json", IReadOnlyDictionary<string, string>? headers = null)
    {
        Responders.Enqueue(_ =>
        {
            var response = new HttpResponseMessage(status);
            response.Content = new StringContent(body, Encoding.UTF8, contentType);
            if (headers is not null)
            {
                foreach ((string n, string v) in headers)
                {
                    response.Headers.TryAddWithoutValidation(n, v);
                }
            }
            return response;
        });
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        SentRequests.Add(CloneRequest(request));

        if (Responders.Count == 0)
        {
            throw new InvalidOperationException("RecordingHandler received an unexpected request: no responder queued.");
        }

        if (BlockUntilCancelled)
        {
            await Task.Delay(Timeout.InfiniteTimeSpan, cancellationToken);
        }

        if (ResponseDelay > TimeSpan.Zero)
        {
            await Task.Delay(ResponseDelay, cancellationToken);
        }

        Func<HttpRequestMessage, HttpResponseMessage> responder = Responders.Dequeue();
        return responder(request);
    }

    private static HttpRequestMessage CloneRequest(HttpRequestMessage source)
    {
        var clone = new HttpRequestMessage(source.Method, source.RequestUri);
        foreach (var h in source.Headers)
        {
            clone.Headers.TryAddWithoutValidation(h.Key, h.Value);
        }
        if (source.Content is not null)
        {
            string body = source.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            clone.Content = new StringContent(body, Encoding.UTF8, source.Content.Headers.ContentType?.MediaType ?? "application/json");
        }
        return clone;
    }
}
