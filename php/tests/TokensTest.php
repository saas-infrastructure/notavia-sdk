<?php

declare(strict_types=1);

namespace NotifyService\Tests;

use NotifyService\Tokens;
use PHPUnit\Framework\TestCase;

final class TokensTest extends TestCase
{
    private const KEY = 'nsi_test_signing_key_value';
    private const ORG = '11111111-1111-1111-1111-111111111111';
    private const USER = 'external-user-42';

    private function verify(string $token): bool
    {
        [$h, $p, $sig] = explode('.', $token);
        $expected = hash_hmac('sha256', "{$h}.{$p}", self::KEY, true);
        $padded = $sig . str_repeat('=', (4 - strlen($sig) % 4) % 4);
        $actual = base64_decode(strtr($padded, '-_', '+/'));
        return hash_equals($expected, $actual);
    }

    public function testInboxTokenIsSignedAndDecodes(): void
    {
        $token = Tokens::mintInbox(self::ORG, self::USER, self::KEY);
        self::assertTrue($this->verify($token));
        $p = Tokens::decode($token);
        self::assertSame(self::ORG, $p->iss);
        self::assertSame(self::USER, $p->sub);
        self::assertSame('inbox', $p->scope);
        self::assertSame(900, $p->exp - $p->iat);
    }

    public function testPrefsScope(): void
    {
        self::assertSame('prefs', Tokens::decode(Tokens::mintPrefs(self::ORG, self::USER, self::KEY))->scope);
    }

    public function testCombinedScope(): void
    {
        self::assertSame('inbox prefs', Tokens::decode(Tokens::mintInboxAndPrefs(self::ORG, self::USER, self::KEY))->scope);
    }

    public function testRejectsKeyWithoutPrefix(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Tokens::mintInbox(self::ORG, self::USER, 'bad_key');
    }

    public function testRejectsTtlBelowMin(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Tokens::mintInbox(self::ORG, self::USER, self::KEY, 10);
    }

    public function testRejectsTtlAboveMax(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Tokens::mintInbox(self::ORG, self::USER, self::KEY, 90000);
    }
}
