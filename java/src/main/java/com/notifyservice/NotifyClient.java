package com.notifyservice;

import com.notifyservice.api.ApiClient;
import com.notifyservice.api.api.DiscordApi;
import com.notifyservice.api.api.InboxApi;
import com.notifyservice.api.api.NotificationsApi;
import com.notifyservice.api.api.PreferencesApi;
import com.notifyservice.api.api.SlackApi;
import com.notifyservice.api.api.SmsApi;
import com.notifyservice.api.api.TeamsApi;
import com.notifyservice.api.api.TemplatesApi;
import com.notifyservice.api.api.UsageApi;
import com.notifyservice.api.api.WebhooksApi;
import com.notifyservice.api.api.WorkflowsApi;
import java.net.http.HttpClient;

/**
 * Top-level NotifyService client: bearer auth, 429 retry, grouped tag resources.
 * Idempotency keys are passed via the generated send methods' Idempotency-Key
 * header parameter.
 */
public final class NotifyClient {

    private final ApiClient apiClient;

    public final NotificationsApi notifications;
    public final TemplatesApi templates;
    public final UsageApi usage;
    public final PreferencesApi preferences;
    public final WorkflowsApi workflows;
    public final WebhooksApi webhooks;
    public final InboxApi inbox;
    public final SmsApi sms;
    public final SlackApi slack;
    public final TeamsApi teams;
    public final DiscordApi discord;

    public NotifyClient(String baseUrl, String apiKey) {
        this(baseUrl, apiKey, 3);
    }

    public NotifyClient(String baseUrl, String apiKey, int maxRetries) {
        HttpClient retrying = new RetryingHttpClient(HttpClient.newHttpClient(), maxRetries);

        this.apiClient = new ApiClient();
        this.apiClient.setHttpClientBuilder(new SingletonHttpClientBuilder(retrying));
        this.apiClient.updateBaseUri(stripTrailingSlash(baseUrl));
        this.apiClient.setRequestInterceptor(builder -> builder.header("Authorization", "Bearer " + apiKey));

        this.notifications = new NotificationsApi(apiClient);
        this.templates = new TemplatesApi(apiClient);
        this.usage = new UsageApi(apiClient);
        this.preferences = new PreferencesApi(apiClient);
        this.workflows = new WorkflowsApi(apiClient);
        this.webhooks = new WebhooksApi(apiClient);
        this.inbox = new InboxApi(apiClient);
        this.sms = new SmsApi(apiClient);
        this.slack = new SlackApi(apiClient);
        this.teams = new TeamsApi(apiClient);
        this.discord = new DiscordApi(apiClient);
    }

    private static String stripTrailingSlash(String url) {
        return url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
    }
}
