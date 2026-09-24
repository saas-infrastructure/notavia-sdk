<?php

declare(strict_types=1);

namespace NotifyService;

/**
 * Verifies Svix-style NotifyService webhook signatures. Server-side only —
 * never expose the signing secret.
 */
final class Webhooks
{
    private const DEFAULT_TOLERANCE_SECONDS = 300;

    public static function verifySignature(
        string $rawBody,
        string $signatureHeader,
        string $signingSecret,
        int $toleranceSeconds = self::DEFAULT_TOLERANCE_SECONDS
    ): bool {
        [$timestamp, $v1Hex] = self::parseHeader($signatureHeader);
        if ($timestamp === null || $v1Hex === null) {
            return false;
        }

        $secret = self::decodeSecret($signingSecret);
        if ($secret === null || $secret === '') {
            return false;
        }

        if (abs(time() - $timestamp) > $toleranceSeconds) {
            return false;
        }

        $expected = hash_hmac('sha256', $timestamp . '.' . $rawBody, $secret, true);
        $actual = @hex2bin($v1Hex);
        if ($actual === false || strlen($actual) !== strlen($expected)) {
            return false;
        }

        return hash_equals($expected, $actual);
    }

    /** @return array{0: int|null, 1: string|null} */
    private static function parseHeader(string $header): array
    {
        $timestamp = null;
        $v1Hex = null;
        foreach (explode(',', $header) as $part) {
            $pos = strpos($part, '=');
            if ($pos === false) {
                continue;
            }
            $key = trim(substr($part, 0, $pos));
            $value = trim(substr($part, $pos + 1));
            if ($key === 't') {
                if ($value === '' || !ctype_digit($value)) {
                    return [null, null];
                }
                $timestamp = (int) $value;
            } elseif ($key === 'v1' && $v1Hex === null) {
                $v1Hex = $value;
            }
        }
        if (!$timestamp || $v1Hex === null) {
            return [null, null];
        }
        return [$timestamp, $v1Hex];
    }

    private static function decodeSecret(string $signingSecret): ?string
    {
        $raw = str_starts_with($signingSecret, 'whsec_') ? substr($signingSecret, 6) : $signingSecret;
        $raw = strtr($raw, '-_', '+/');
        $pad = strlen($raw) % 4;
        if ($pad === 2) {
            $raw .= '==';
        } elseif ($pad === 3) {
            $raw .= '=';
        }
        $decoded = base64_decode($raw, true);
        return $decoded === false ? null : $decoded;
    }
}
