package com.notifyservice;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.notifyservice.api.model.NotificationChannel;
import com.notifyservice.api.model.Recipient;
import com.notifyservice.api.model.SendNotificationRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;

@EnabledIfEnvironmentVariable(named = "NOTIFY_BASE_URL", matches = ".+")
@EnabledIfEnvironmentVariable(named = "NOTIFY_API_KEY", matches = ".+")
class SendPipelineE2ETest {

    @Test
    void sendReachesSentStatus() throws Exception {
        NotifyClient notify = new NotifyClient(System.getenv("NOTIFY_BASE_URL"), System.getenv("NOTIFY_API_KEY"));

        SendNotificationRequest req = new SendNotificationRequest()
                .channel(NotificationChannel.EMAIL)
                .recipient(new Recipient().address("alice@example.com").name("Alice"))
                .subject("Java SDK E2E")
                .htmlBody("<p>via java SDK over real HTTP</p>");

        var created = notify.notifications.sendNotification(req, null);
        String status = String.valueOf(created.getStatus());
        long deadline = System.currentTimeMillis() + 30_000;
        while (System.currentTimeMillis() < deadline
                && (status.equalsIgnoreCase("queued") || status.equalsIgnoreCase("sending"))) {
            Thread.sleep(300);
            status = String.valueOf(notify.notifications.getNotification(created.getId()).getStatus());
        }

        assertEquals("sent", status.toLowerCase());
    }
}
