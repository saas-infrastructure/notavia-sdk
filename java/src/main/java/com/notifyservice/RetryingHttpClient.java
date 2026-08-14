package com.notifyservice;

import java.io.IOException;
import java.net.Authenticator;
import java.net.CookieHandler;
import java.net.ProxySelector;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.WebSocket;
import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;

/**
 * Delegating HttpClient that retries 429/5xx responses (honouring Retry-After)
 * on the blocking {@link #send} path used by the generated native client.
 */
final class RetryingHttpClient extends HttpClient {

    private final HttpClient delegate;
    private final int maxRetries;

    RetryingHttpClient(HttpClient delegate, int maxRetries) {
        this.delegate = delegate;
        this.maxRetries = maxRetries;
    }

    @Override
    public <T> HttpResponse<T> send(HttpRequest request, HttpResponse.BodyHandler<T> responseBodyHandler)
            throws IOException, InterruptedException {
        HttpResponse<T> response = null;
        for (int attempt = 0; attempt <= maxRetries; attempt++) {
            response = delegate.send(request, responseBodyHandler);
            int sc = response.statusCode();
            if (sc != 429 && sc < 500) {
                return response;
            }
            if (attempt == maxRetries) {
                return response;
            }
            Thread.sleep(retryAfterMillis(response, attempt));
        }
        return response;
    }

    private static long retryAfterMillis(HttpResponse<?> response, int attempt) {
        Optional<String> header = response.headers().firstValue("Retry-After");
        if (header.isPresent()) {
            try {
                return Math.max(0, Long.parseLong(header.get().trim())) * 1000L;
            } catch (NumberFormatException ignored) {
                // fall through to backoff
            }
        }
        return (long) (500L * Math.pow(2, attempt));
    }

    @Override
    public <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, HttpResponse.BodyHandler<T> responseBodyHandler) {
        return delegate.sendAsync(request, responseBodyHandler);
    }

    @Override
    public <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, HttpResponse.BodyHandler<T> responseBodyHandler,
            HttpResponse.PushPromiseHandler<T> pushPromiseHandler) {
        return delegate.sendAsync(request, responseBodyHandler, pushPromiseHandler);
    }

    @Override public Optional<CookieHandler> cookieHandler() { return delegate.cookieHandler(); }
    @Override public Optional<Duration> connectTimeout() { return delegate.connectTimeout(); }
    @Override public Redirect followRedirects() { return delegate.followRedirects(); }
    @Override public Optional<ProxySelector> proxy() { return delegate.proxy(); }
    @Override public SSLContext sslContext() { return delegate.sslContext(); }
    @Override public SSLParameters sslParameters() { return delegate.sslParameters(); }
    @Override public Optional<Authenticator> authenticator() { return delegate.authenticator(); }
    @Override public Version version() { return delegate.version(); }
    @Override public Optional<Executor> executor() { return delegate.executor(); }
    @Override public WebSocket.Builder newWebSocketBuilder() { return delegate.newWebSocketBuilder(); }
}
