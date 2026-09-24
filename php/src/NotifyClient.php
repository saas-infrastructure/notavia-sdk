<?php

declare(strict_types=1);

namespace NotifyService;

use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use NotifyService\Api\Api\DiscordApi;
use NotifyService\Api\Api\InboxApi;
use NotifyService\Api\Api\NotificationsApi;
use NotifyService\Api\Api\PreferencesApi;
use NotifyService\Api\Api\SlackApi;
use NotifyService\Api\Api\SMSApi;
use NotifyService\Api\Api\TeamsApi;
use NotifyService\Api\Api\TemplatesApi;
use NotifyService\Api\Api\UsageApi;
use NotifyService\Api\Api\WebhooksApi;
use NotifyService\Api\Api\WorkflowsApi;
use NotifyService\Api\Configuration;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

final class NotifyClient
{
    public readonly NotificationsApi $notifications;
    public readonly TemplatesApi $templates;
    public readonly UsageApi $usage;
    public readonly PreferencesApi $preferences;
    public readonly WorkflowsApi $workflows;
    public readonly WebhooksApi $webhooks;
    public readonly InboxApi $inbox;
    public readonly SMSApi $sms;
    public readonly SlackApi $slack;
    public readonly TeamsApi $teams;
    public readonly DiscordApi $discord;

    public function __construct(string $baseUrl, string $apiKey, int $maxRetries = 3)
    {
        $config = Configuration::getDefaultConfiguration()
            ->setHost(rtrim($baseUrl, '/'))
            ->setAccessToken($apiKey);

        $stack = HandlerStack::create();
        $stack->push(self::retryMiddleware($maxRetries));
        $http = new GuzzleClient(['handler' => $stack]);

        $this->notifications = new NotificationsApi($http, $config);
        $this->templates = new TemplatesApi($http, $config);
        $this->usage = new UsageApi($http, $config);
        $this->preferences = new PreferencesApi($http, $config);
        $this->workflows = new WorkflowsApi($http, $config);
        $this->webhooks = new WebhooksApi($http, $config);
        $this->inbox = new InboxApi($http, $config);
        $this->sms = new SMSApi($http, $config);
        $this->slack = new SlackApi($http, $config);
        $this->teams = new TeamsApi($http, $config);
        $this->discord = new DiscordApi($http, $config);
    }

    public static function retryMiddleware(int $maxRetries): callable
    {
        return Middleware::retry(
            static function (int $retries, RequestInterface $request, ?ResponseInterface $response = null) use ($maxRetries): bool {
                if ($retries >= $maxRetries || $response === null) {
                    return false;
                }
                $code = $response->getStatusCode();
                return $code === 429 || $code >= 500;
            },
            static function (int $retries, ?ResponseInterface $response = null): int {
                if ($response !== null && $response->hasHeader('Retry-After')) {
                    return max(0, (int) $response->getHeaderLine('Retry-After')) * 1000;
                }
                return (int) (500 * (2 ** $retries));
            }
        );
    }
}
