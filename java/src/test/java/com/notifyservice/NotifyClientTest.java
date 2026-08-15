package com.notifyservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

class NotifyClientTest {

    @Test
    void exposesTagResources() {
        NotifyClient notify = new NotifyClient("https://api.example.com", "ns_test_abc");
        assertNotNull(notify.notifications);
        assertNotNull(notify.templates);
        assertNotNull(notify.usage);
        assertNotNull(notify.workflows);
        assertNotNull(notify.preferences);
    }

    @Test
    void retryingClientRetriesOn429() throws Exception {
        java.util.concurrent.atomic.AtomicInteger calls = new java.util.concurrent.atomic.AtomicInteger();
        java.net.http.HttpClient stub = new StubHttpClient(req -> {
            int n = calls.incrementAndGet();
            return n == 1 ? 429 : 200;
        });
        RetryingHttpClient retrying = new RetryingHttpClient(stub, 3);

        java.net.http.HttpResponse<String> resp = retrying.send(
                java.net.http.HttpRequest.newBuilder(java.net.URI.create("https://example.com")).build(),
                java.net.http.HttpResponse.BodyHandlers.ofString());

        assertEquals(200, resp.statusCode());
        assertEquals(2, calls.get());
    }
}
