using System.Diagnostics;

namespace NotifyService.Sdk;

internal static class Telemetry
{
    public static readonly ActivitySource Source = new("NotifyService.Sdk");
}
