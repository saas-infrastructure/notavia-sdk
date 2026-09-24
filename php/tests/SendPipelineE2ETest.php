<?php

declare(strict_types=1);

namespace NotifyService\Tests;

use NotifyService\Api\Model\NotificationChannel;
use NotifyService\Api\Model\Recipient;
use NotifyService\Api\Model\SendNotificationRequest;
use NotifyService\NotifyClient;
use PHPUnit\Framework\TestCase;

final class SendPipelineE2ETest extends TestCase
{
    public function testSendReachesSentStatus(): void
    {
        $baseUrl = getenv('NOTIFY_BASE_URL');
        $apiKey = getenv('NOTIFY_API_KEY');
        if ($baseUrl === false || $apiKey === false || $baseUrl === '' || $apiKey === '') {
            self::markTestSkipped('NOTIFY_BASE_URL/NOTIFY_API_KEY not set.');
        }

        $notify = new NotifyClient($baseUrl, $apiKey);
        $request = (new SendNotificationRequest())
            ->setChannel(NotificationChannel::EMAIL)
            ->setRecipient((new Recipient())->setAddress('alice@example.com')->setName('Alice'))
            ->setSubject('PHP SDK E2E')
            ->setHtmlBody('<p>via php SDK over real HTTP</p>');
        $created = $notify->notifications->sendNotification($request);

        $status = $created->getStatus()->value;
        $deadline = time() + 30;
        while (time() < $deadline && in_array(strtolower($status), ['queued', 'sending'], true)) {
            usleep(300000);
            $status = $notify->notifications->getNotification($created->getId())->getStatus()->value;
        }

        self::assertSame('sent', strtolower($status), "final status was {$status}");
    }
}
