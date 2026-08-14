<?php

declare(strict_types=1);

namespace NotifyService;

/** Decoded NotifyService delegated-token payload. */
final class TokenPayload
{
    public function __construct(
        public readonly string $iss,
        public readonly string $sub,
        public readonly string $scope,
        public readonly int $iat,
        public readonly int $exp,
    ) {
    }
}
