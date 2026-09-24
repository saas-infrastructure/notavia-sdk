using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NotifyService.Sdk;

namespace NotifyService.Sdk.Tests;

public class OptionsBindingTests
{
    [Fact]
    public void AddNotifyClient_with_configuration_binds_default_section()
    {
        var inMemory = new Dictionary<string, string?>
        {
            ["NotifyService:BaseUrl"] = "https://api.example.com",
            ["NotifyService:ApiKey"] = "ns_test_xxx",
        };
        IConfiguration cfg = new ConfigurationBuilder().AddInMemoryCollection(inMemory).Build();

        var services = new ServiceCollection();
        services.AddNotifyClient(cfg);

        IServiceProvider sp = services.BuildServiceProvider();
        NotifyOptions opts = sp.GetRequiredService<IOptions<NotifyOptions>>().Value;
        opts.BaseUrl.Should().Be("https://api.example.com");
        opts.ApiKey.Should().Be("ns_test_xxx");
    }

    [Fact]
    public void AddNotifyClient_with_configuration_binds_custom_section()
    {
        var inMemory = new Dictionary<string, string?>
        {
            ["MyApp:Notify:BaseUrl"] = "https://api.example.com",
            ["MyApp:Notify:ApiKey"] = "ns_test_xxx",
        };
        IConfiguration cfg = new ConfigurationBuilder().AddInMemoryCollection(inMemory).Build();

        var services = new ServiceCollection();
        services.AddNotifyClient(cfg, sectionName: "MyApp:Notify");

        IServiceProvider sp = services.BuildServiceProvider();
        NotifyOptions opts = sp.GetRequiredService<IOptions<NotifyOptions>>().Value;
        opts.ApiKey.Should().Be("ns_test_xxx");
    }

    [Fact]
    public void AddNotifyClient_throws_on_missing_api_key_at_startup()
    {
        var inMemory = new Dictionary<string, string?>
        {
            ["NotifyService:BaseUrl"] = "https://api.example.com",
            // ApiKey deliberately missing
        };
        IConfiguration cfg = new ConfigurationBuilder().AddInMemoryCollection(inMemory).Build();

        var services = new ServiceCollection();
        services.AddNotifyClient(cfg);

        IServiceProvider sp = services.BuildServiceProvider();
        Action act = () =>
        {
            NotifyOptions value = sp.GetRequiredService<IOptions<NotifyOptions>>().Value;
            _ = value.ApiKey;
        };

        act.Should().Throw<OptionsValidationException>().WithMessage("*ApiKey*");
    }

    [Fact]
    public void AddNotifyClient_throws_on_relative_base_url()
    {
        var services = new ServiceCollection();
        services.AddNotifyClient(o => { o.BaseUrl = "not-a-url"; o.ApiKey = "ns_test_x"; });

        IServiceProvider sp = services.BuildServiceProvider();
        Action act = () =>
        {
            NotifyOptions value = sp.GetRequiredService<IOptions<NotifyOptions>>().Value;
            _ = value.BaseUrl;
        };

        act.Should().Throw<OptionsValidationException>().WithMessage("*BaseUrl*");
    }
}
