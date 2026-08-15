namespace NotifyService.Prefs.Blazor;

/// <summary>Controls the visual layout of the preference centre widget.</summary>
public enum PrefsLayout
{
    /// <summary>Automatically selects layout based on the available viewport width.</summary>
    Auto,

    /// <summary>A tabular grid of categories × channels.</summary>
    Table,

    /// <summary>A card-per-category layout.</summary>
    Cards,
}
