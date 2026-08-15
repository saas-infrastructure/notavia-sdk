package com.notifyservice;

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
import java.util.function.Function;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.SSLSession;

/** Minimal HttpClient test double returning a status code chosen per request. */
final class StubHttpClient extends HttpClient {
    private final Function<HttpRequest, Integer> statusFor;

    StubHttpClient(Function<HttpRequest, Integer> statusFor) {
        this.statusFor = statusFor;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> HttpResponse<T> send(HttpRequest request, HttpResponse.BodyHandler<T> handler) {
        int status = statusFor.apply(request);
        return (HttpResponse<T>) new StubResponse<>(request, status, null);
    }

    @Override
    public <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, HttpResponse.BodyHandler<T> handler) {
        return CompletableFuture.completedFuture(send(request, handler));
    }

    @Override
    public <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, HttpResponse.BodyHandler<T> handler, HttpResponse.PushPromiseHandler<T> pph) {
        return sendAsync(request, handler);
    }

    @Override public Optional<CookieHandler> cookieHandler() { return Optional.empty(); }
    @Override public Optional<Duration> connectTimeout() { return Optional.empty(); }
    @Override public Redirect followRedirects() { return Redirect.NEVER; }
    @Override public Optional<ProxySelector> proxy() { return Optional.empty(); }
    @Override public SSLContext sslContext() { try { return SSLContext.getDefault(); } catch (Exception e) { throw new RuntimeException(e); } }
    @Override public SSLParameters sslParameters() { return new SSLParameters(); }
    @Override public Optional<Authenticator> authenticator() { return Optional.empty(); }
    @Override public Version version() { return Version.HTTP_1_1; }
    @Override public Optional<Executor> executor() { return Optional.empty(); }
    @Override public WebSocket.Builder newWebSocketBuilder() { throw new UnsupportedOperationException(); }

    static final class StubResponse<T> implements HttpResponse<T> {
        private final HttpRequest req;
        private final int status;
        private final T bodyValue;

        StubResponse(HttpRequest req, int status, T bodyValue) {
            this.req = req;
            this.status = status;
            this.bodyValue = bodyValue;
        }

        @Override public int statusCode() { return status; }
        @Override public HttpRequest request() { return req; }
        @Override public Optional<HttpResponse<T>> previousResponse() { return Optional.empty(); }
        @Override public java.net.http.HttpHeaders headers() { return java.net.http.HttpHeaders.of(java.util.Map.of(), (a, b) -> true); }
        @Override public T body() { return bodyValue; }
        @Override public Optional<SSLSession> sslSession() { return Optional.empty(); }
        @Override public java.net.URI uri() { return req.uri(); }
        @Override public HttpClient.Version version() { return HttpClient.Version.HTTP_1_1; }
    }
}
