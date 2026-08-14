<?php

declare(strict_types=1);

namespace NotifyService\Tests;

use NotifyService\Api\Model\NotificationChannel;
use NotifyService\Api\Model\Recipient;
use NotifyService\Api\Model\SendNotificationRequest;
use NotifyService\NotifyClient;
use PHPUnit\Framework\TestCase;

final class HostIntegrationTest extends TestCase
{
    private string $baseUrl;
    private string $apiKey;

    protected function setUp(): void
    {
        $baseUrl = getenv('NOTIFY_BASE_URL');
        $apiKey  = getenv('NOTIFY_API_KEY');
        if ($baseUrl === false || $apiKey === false || $baseUrl === '' || $apiKey === '') {
            self::markTestSkipped('NOTIFY_BASE_URL/NOTIFY_API_KEY not set.');
        }
        $this->baseUrl = $baseUrl;
        $this->apiKey  = $apiKey;
    }

    public function testSendThenList(): void
    {
        $notify = new NotifyClient($this->baseUrl, $this->apiKey);

        $recipient = (new Recipient())
            ->setAddress('alice@example.com')
            ->setName('Alice');

        $request = (new SendNotificationRequest())
            ->setChannel(NotificationChannel::EMAIL)
            ->setRecipient($recipient)
            ->setSubject('Integration')
            ->setHtmlBody('<p>Integration test</p>');

        $created = $notify->notifications->sendNotification($request);
        $page    = $notify->notifications->listNotifications(null, null, null, null, 5);
        $ids     = array_map(static fn ($n) => $n->getId(), $page->getData());

        self::assertContains($created->getId(), $ids);
    }
}
