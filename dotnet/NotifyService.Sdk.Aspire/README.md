# Notavia SDK — Aspire integration

Drop-in .NET Aspire registration for the `NotifyService.Sdk` client.

## Install

```
dotnet add package Notavia.Sdk.Aspire
```

## Register

In your consumer project:

```csharp
using NotifyService.Sdk.Aspire;

var builder = WebApplication.CreateBuilder(args);
builder.AddNotifyClient();   // looks up ConnectionStrings:notifyservice
```

In your AppHost project:

```csharp
var notify = builder.AddConnectionString("notifyservice");
builder.AddProject<Projects.MyApi>("api").WithReference(notify);
```

Connection-string format:

```
Endpoint=https://api.notavia.saas-infrastructure.com;ApiKey=ns_live_xxx
```

Keys are case-insensitive; only `Endpoint` and `ApiKey` are recognized.

## License

MIT.
