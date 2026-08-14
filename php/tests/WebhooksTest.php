<?php

declare(strict_types=1);

namespace NotifyService\Tests;

use NotifyService\Webhooks;
use PHPUnit\Framework\TestCase;

final class WebhooksTest extends TestCase
{
    /** @return array{0: string, 1: string} encoded secret + raw bytes */
    private function secret(): array
    {
        $raw = 'super-secret-bytes-0123456789abcd';
        $encoded = 'whsec_' . rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
        return [$encoded, $raw];
    }

    private function sign(string $raw, int $ts, string $body): string
    {
        $mac = hash_hmac('sha256', $ts . '.' . $body, $raw);
        return "t={$ts},v1={$mac}";
    }

    public function testValidSignaturePasses(): void
    {
        [$secret, $raw] = $this->secret();
        $body = '{"event":"notification.delivered"}';
        $ts = time();
        self::assertTrue(Webhooks::verifySignature($body, $this->sign($raw, $ts, $body), $secret));
    }

    public function testTamperedBodyFails(): void
    {
        [$secret, $raw] = $this->secret();
        $header = $this->sign($raw, time(), '{"event":"a"}');
        self::assertFalse(Webhooks::verifySignature('{"event":"b"}', $header, $secret));
    }

    public function testExpiredTimestampFails(): void
    {
        [$secret, $raw] = $this->secret();
        $ts = time() - 10000;
        self::assertFalse(Webhooks::verifySignature('{}', $this->sign($raw, $ts, '{}'), $secret));
    }

    public function testWrongSecretFails(): void
    {
        [, $raw] = $this->secret();
        $ts = time();
        $header = $this->sign($raw, $ts, '{}');
        $other = 'whsec_' . rtrim(strtr(base64_encode('different-secret-bytes-aaaaaaaaaa'), '+/', '-_'), '=');
        self::assertFalse(Webhooks::verifySignature('{}', $header, $other));
    }

    public function testMalformedHeaderFails(): void
    {
        [$secret, ] = $this->secret();
        self::assertFalse(Webhooks::verifySignature('{}', 'not-a-valid-header', $secret));
    }

    public function testSecretWithoutPrefixWorks(): void
    {
        [, $raw] = $this->secret();
        $ts = time();
        $bare = rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
        self::assertTrue(Webhooks::verifySignature('{}', $this->sign($raw, $ts, '{}'), $bare));
    }
}
