package com.notifyservice;

import java.net.Authenticator;
import java.net.ProxySelector;
import java.net.http.HttpClient;
import java.time.Duration;
import java.util.concurrent.Executor;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;

/** HttpClient.Builder that ignores configuration and yields a fixed instance. */
final class SingletonHttpClientBuilder implements HttpClient.Builder {

    private final HttpClient instance;

    SingletonHttpClientBuilder(HttpClient instance) {
        this.instance = instance;
    }

    @Override public HttpClient build() { return instance; }

    @Override public HttpClient.Builder cookieHandler(java.net.CookieHandler c) { return this; }
    @Override public HttpClient.Builder connectTimeout(Duration d) { return this; }
    @Override public HttpClient.Builder sslContext(SSLContext s) { return this; }
    @Override public HttpClient.Builder sslParameters(SSLParameters s) { return this; }
    @Override public HttpClient.Builder executor(Executor e) { return this; }
    @Override public HttpClient.Builder followRedirects(HttpClient.Redirect r) { return this; }
    @Override public HttpClient.Builder version(HttpClient.Version v) { return this; }
    @Override public HttpClient.Builder priority(int p) { return this; }
    @Override public HttpClient.Builder proxy(ProxySelector p) { return this; }
    @Override public HttpClient.Builder authenticator(Authenticator a) { return this; }
}
