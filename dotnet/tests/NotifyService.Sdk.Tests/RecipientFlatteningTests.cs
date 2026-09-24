using FluentAssertions;
using NotifyService.Sdk.Notifications;

namespace NotifyService.Sdk.Tests;

public class RecipientFlatteningTests
{
    [Fact]
    public void Slack_user_id_flattens_to_address()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Slack,
            new Recipient(Address: null, ExternalUserId: "u", SlackUserId: "U123ABC"));

        result.Address.Should().Be("U123ABC");
        result.SlackUserId.Should().BeNull();
        result.SlackChannelId.Should().BeNull();
    }

    [Fact]
    public void Slack_channel_id_flattens_to_address_when_user_id_absent()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Slack,
            new Recipient(Address: null, ExternalUserId: "u", SlackChannelId: "C123ABC"));

        result.Address.Should().Be("C123ABC");
        result.SlackChannelId.Should().BeNull();
    }

    [Fact]
    public void Slack_user_id_takes_priority_over_channel_id()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Slack,
            new Recipient(Address: null, ExternalUserId: "u", SlackUserId: "U123ABC", SlackChannelId: "C999"));

        result.Address.Should().Be("U123ABC");
        result.SlackUserId.Should().BeNull();
        result.SlackChannelId.Should().BeNull();
    }

    [Fact]
    public void Teams_endpoint_id_flattens_to_address()
    {
        Guid guid = Guid.NewGuid();
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Teams,
            new Recipient(Address: null, ExternalUserId: "u", TeamsEndpointId: guid));

        result.Address.Should().Be(guid.ToString());
        result.TeamsEndpointId.Should().BeNull();
    }

    [Fact]
    public void Discord_endpoint_id_flattens_to_address()
    {
        Guid guid = Guid.NewGuid();
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Discord,
            new Recipient(Address: null, ExternalUserId: "u", DiscordEndpointId: guid));

        result.Address.Should().Be(guid.ToString());
        result.DiscordEndpointId.Should().BeNull();
    }

    [Fact]
    public void Sms_phone_flattens_to_address_when_address_absent()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Sms,
            new Recipient(Address: null, ExternalUserId: "u", Phone: "+15551234567"));

        result.Address.Should().Be("+15551234567");
        result.Phone.Should().BeNull();
    }

    [Fact]
    public void Sms_explicit_address_takes_priority_over_phone()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Sms,
            new Recipient(Address: "+19990000000", ExternalUserId: "u", Phone: "+15551234567"));

        result.Address.Should().Be("+19990000000");
        result.Phone.Should().BeNull();
    }

    [Fact]
    public void Email_passes_through_unchanged()
    {
        Recipient result = RecipientFlattener.FlattenForChannel(
            NotificationChannel.Email,
            new Recipient(Address: "a@b.com", ExternalUserId: "u"));

        result.Address.Should().Be("a@b.com");
        result.SlackUserId.Should().BeNull();
        result.TeamsEndpointId.Should().BeNull();
        result.DiscordEndpointId.Should().BeNull();
    }

    [Fact]
    public void Unknown_channel_passes_through_unchanged()
    {
        Recipient input = new Recipient(Address: "x@y.com", ExternalUserId: "u", SlackUserId: "U999");
        Recipient result = RecipientFlattener.FlattenForChannel("unknown_channel", input);

        result.Should().Be(input);
    }
}
