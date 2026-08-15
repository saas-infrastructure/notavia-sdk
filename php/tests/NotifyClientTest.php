<?php

declare(strict_types=1);

namespace NotifyService\Tests;

use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use NotifyService\NotifyClient;
use PHPUnit\Framework\TestCase;

final class NotifyClientTest extends TestCase
{
    public function testExposesTagResourcesAndAuth(): void
    {
        $notify = new NotifyClient('https://api.example.com/', 'ns_test_abc');
        self::assertNotNull($notify->notifications);
        self::assertNotNull($notify->templates);
        self::assertNotNull($notify->usage);
        self::assertNotNull($notify->workflows);
        self::assertNotNull($notify->preferences);

        $config = $notify->notifications->getConfig();
        self::assertSame('ns_test_abc', $config->getAccessToken());
        self::assertSame('https://api.example.com', $config->getHost());
    }

    public function testRetryMiddlewareRetriesOn429(): void
    {
        $mock = new MockHandler([
            new Response(429, ['Retry-After' => '0']),
            new Response(200, [], '{}'),
        ]);
        $stack = HandlerStack::create($mock);
        $stack->push(NotifyClient::retryMiddleware(3));
        $client = new GuzzleClient(['handler' => $stack]);

        $resp = $client->request('GET', 'https://example.com');

        self::assertSame(200, $resp->getStatusCode());
        self::assertCount(0, $mock);
    }
}
