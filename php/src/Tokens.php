<?php

declare(strict_types=1);

namespace NotifyService;

/** Mints NotifyService inbox/prefs delegated JWTs (HS256). Server-side only. */
final class Tokens
{
    private const DEFAULT_TTL = 900;
    private const MIN_TTL = 60;
    private const MAX_TTL = 86400;

    public static function mintInbox(string $organizationId, string $externalUserId, string $signingKey, int $ttlSeconds = self::DEFAULT_TTL): string
    {
        return self::mint($organizationId, $externalUserId, $signingKey, 'inbox', $ttlSeconds);
    }

    public static function mintPrefs(string $organizationId, string $externalUserId, string $signingKey, int $ttlSeconds = self::DEFAULT_TTL): string
    {
        return self::mint($organizationId, $externalUserId, $signingKey, 'prefs', $ttlSeconds);
    }

    public static function mintInboxAndPrefs(string $organizationId, string $externalUserId, string $signingKey, int $ttlSeconds = self::DEFAULT_TTL): string
    {
        return self::mint($organizationId, $externalUserId, $signingKey, 'inbox prefs', $ttlSeconds);
    }

    public static function decode(string $token): TokenPayload
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            throw new \InvalidArgumentException('Token must have three dot-separated parts.');
        }
        /** @var array<string, mixed> $data */
        $data = json_decode(self::b64urlDecode($parts[1]), true, 512, JSON_THROW_ON_ERROR);
        return new TokenPayload(
            (string) $data['iss'],
            (string) $data['sub'],
            (string) $data['scope'],
            (int) $data['iat'],
            (int) $data['exp'],
        );
    }

    private static function mint(string $organizationId, string $externalUserId, string $signingKey, string $scope, int $ttlSeconds): string
    {
        if ($ttlSeconds < self::MIN_TTL || $ttlSeconds > self::MAX_TTL) {
            throw new \InvalidArgumentException('ttlSeconds must be between 60 and 86400.');
        }
        if (!str_starts_with($signingKey, 'nsi_')) {
            throw new \InvalidArgumentException("signingKey must start with 'nsi_'.");
        }

        $now = time();
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['iss' => $organizationId, 'sub' => $externalUserId, 'scope' => $scope, 'iat' => $now, 'exp' => $now + $ttlSeconds];

        $headerB64 = self::b64url(json_encode($header, JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR));
        $payloadB64 = self::b64url(json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR));
        $signingInput = "{$headerB64}.{$payloadB64}";
        $sig = hash_hmac('sha256', $signingInput, $signingKey, true);

        return "{$signingInput}." . self::b64url($sig);
    }

    private static function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function b64urlDecode(string $data): string
    {
        $pad = strlen($data) % 4;
        if ($pad > 0) {
            $data .= str_repeat('=', 4 - $pad);
        }
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
