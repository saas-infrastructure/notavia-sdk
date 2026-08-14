using System.Text.Json.Serialization;

namespace NotifyService.Prefs.Blazor;

/// <summary>
/// One cell in the preference grid: the intersection of a category and a channel.
/// Serializes with snake_case names to match the JS bridge payload.
/// </summary>
/// <param name="CategoryKey">Machine-readable key identifying the category.</param>
/// <param name="CategoryName">Human-readable display name for the category.</param>
/// <param name="IsCritical">When <see langword="true"/> the end-user cannot opt out of this category.</param>
/// <param name="Channel">The delivery channel (e.g. <c>email</c>, <c>sms</c>).</param>
/// <param name="OptedIn">Whether the end-user is currently opted in to this cell.</param>
/// <param name="Source">Who last modified this preference (e.g. <c>user</c>, <c>customer</c>).</param>
/// <param name="UpdatedAt">UTC timestamp of the most recent change to this cell.</param>
public sealed record PreferenceCell(
    [property: JsonPropertyName("category_key")]   string          CategoryKey,
    [property: JsonPropertyName("category_name")]  string          CategoryName,
    [property: JsonPropertyName("is_critical")]    bool            IsCritical,
    [property: JsonPropertyName("channel")]        string          Channel,
    [property: JsonPropertyName("opted_in")]       bool            OptedIn,
    [property: JsonPropertyName("source")]         string          Source,
    [property: JsonPropertyName("updated_at")]     DateTimeOffset  UpdatedAt);
