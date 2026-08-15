package com.notifyservice;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.notifyservice.api.model.NotificationChannel;
import com.notifyservice.api.model.Recipient;
import com.notifyservice.api.model.SendNotificationRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;

@EnabledIfEnvironmentVariable(named = "NOTIFY_BASE_URL", matches = ".+")
@EnabledIfEnvironmentVariable(named = "NOTIFY_API_KEY", matches = ".+")
class HostIntegrationTest {

    private static NotifyClient client() {
        return new NotifyClient(System.getenv("NOTIFY_BASE_URL"), System.getenv("NOTIFY_API_KEY"));
    }

    @Test
    void sendThenList() throws Exception {
        NotifyClient notify = client();
        SendNotificationRequest req = new SendNotificationRequest()
                .channel(NotificationChannel.EMAIL)
                .recipient(new Recipient().address("alice@example.com").name("Alice"))
                .subject("Integration")
                .htmlBody("<p>via java SDK</p>");

        var created = notify.notifications.sendNotification(req, null);
        var page = notify.notifications.listNotifications(null, null, null, null, 5, null);

        assertTrue(page.getData().stream().anyMatch(n -> n.getId().equals(created.getId())));
    }
}
