using NotifyService.Sdk.Internal;
using NotifyService.Sdk.Templates;

namespace NotifyService.Sdk.Workflows;

/// <summary>Provides access to workflow trigger, run inspection, cancellation, and event operations.</summary>
public sealed class NotifyServiceWorkflowsClient
{
    private readonly NotifyHttpClient _http;

    internal NotifyServiceWorkflowsClient(NotifyHttpClient http)
    {
        _http = http;
    }

    /// <summary>
    /// Triggers a workflow run for the given workflow key.
    /// Pass an <c>Idempotency-Key</c> to make the trigger operation idempotent — the server returns the
    /// original run if a run with that key was already started.
    /// </summary>
    /// <param name="key">The stable workflow key (e.g. <c>"invoice_paid"</c>).</param>
    /// <param name="request">Trigger request containing the trigger payload.</param>
    /// <param name="idempotencyKey">Optional idempotency key.</param>
    /// <param name="ct">Cancellation token.</param>
    public async Task<WorkflowTriggerResponse> TriggerAsync(
        string key,
        WorkflowTriggerRequest request,
        string? idempotencyKey = null,
        CancellationToken ct = default)
    {
        Dictionary<string, string>? headers = null;
        if (!string.IsNullOrEmpty(idempotencyKey))
        {
            headers = new Dictionary<string, string> { ["Idempotency-Key"] = idempotencyKey };
        }

        (_, WorkflowTriggerResponse body) = await _http.PostWithFallbackAsync(
            $"/v1/workflows/{key}/trigger",
            request,
            NotifyJsonContext.Default.WorkflowTriggerResponse,
            headers,
            "notifyservice.workflows.trigger",
            ct);

        return body;
    }

    /// <summary>Returns the current state of a workflow run.</summary>
    /// <param name="runId">The run id returned by <see cref="TriggerAsync"/>.</param>
    /// <param name="ct">Cancellation token.</param>
    public Task<WorkflowRunResponse> GetRunAsync(Guid runId, CancellationToken ct = default) =>
        _http.GetAsync(
            $"/v1/workflows/runs/{runId}",
            NotifyJsonContext.Default.WorkflowRunResponse,
            "notifyservice.workflows.get_run",
            ct);

    /// <summary>
    /// Polls <see cref="GetRunAsync"/> until the run reaches a terminal state
    /// (<c>Completed</c>, <c>Failed</c>, or <c>Cancelled</c>), then returns the final state.
    /// Polling uses exponential back-off starting at the given <paramref name="pollInterval"/> and capped at 5 seconds.
    /// Throws <see cref="TimeoutException"/> if <paramref name="timeout"/> elapses before a terminal state is reached.
    /// </summary>
    /// <param name="runId">The run id to poll.</param>
    /// <param name="timeout">Maximum time to wait. Defaults to 5 minutes.</param>
    /// <param name="pollInterval">Initial polling interval. Defaults to 500 ms.</param>
    /// <param name="ct">Cancellation token.</param>
    public async Task<WorkflowRunResponse> WaitForCompletionAsync(
        Guid runId,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null,
        CancellationToken ct = default)
    {
        TimeSpan deadline = timeout ?? TimeSpan.FromMinutes(5);
        TimeSpan current = pollInterval ?? TimeSpan.FromMilliseconds(500);
        TimeSpan cap = TimeSpan.FromSeconds(5);

        using CancellationTokenSource cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(deadline);

        while (true)
        {
            WorkflowRunResponse run = await GetRunAsync(runId, cts.Token);

            if (run.Status is "Completed" or "Failed" or "Cancelled")
                return run;

            try
            {
                await Task.Delay(current, cts.Token);
            }
            catch (OperationCanceledException) when (!ct.IsCancellationRequested)
            {
                throw new TimeoutException(
                    $"Workflow run {runId} did not reach a terminal state within {deadline}.");
            }

            current = current * 2 < cap ? current * 2 : cap;
        }
    }

    /// <summary>Requests cancellation of a workflow run.</summary>
    /// <param name="runId">The run to cancel.</param>
    /// <param name="ct">Cancellation token.</param>
    public Task CancelRunAsync(Guid runId, CancellationToken ct = default) =>
        _http.PostVoidAsync(
            $"/v1/workflows/runs/{runId}/cancel",
            headers: null,
            "notifyservice.workflows.cancel_run",
            ct);

    /// <summary>Posts an event to a specific workflow run. Wakes the run if it is waiting on a <c>wait_for_event</c> step whose condition matches.</summary>
    /// <param name="runId">The target run id.</param>
    /// <param name="eventName">Event name declared in the workflow DSL.</param>
    /// <param name="data">Optional event payload.</param>
    /// <param name="ct">Cancellation token.</param>
    public Task PostRunEventAsync(
        Guid runId,
        string eventName,
        object? data = null,
        CancellationToken ct = default) =>
        _http.PostVoidAsync(
            $"/v1/workflows/runs/{runId}/events",
            new WorkflowEventBody(eventName, data ?? new { }),
            headers: null,
            "notifyservice.workflows.post_run_event",
            ct);

    /// <summary>Posts an event to all waiting runs of a workflow identified by its key. Useful for fan-out event delivery.</summary>
    /// <param name="key">The workflow key.</param>
    /// <param name="eventName">Event name declared in the workflow DSL.</param>
    /// <param name="matchData">Optional match payload used by the server to filter which waiting runs to wake.</param>
    /// <param name="data">Optional event payload delivered to awoken runs.</param>
    /// <param name="ct">Cancellation token.</param>
    public Task PostWorkflowEventAsync(
        string key,
        string eventName,
        object? matchData = null,
        object? data = null,
        CancellationToken ct = default) =>
        _http.PostVoidAsync(
            $"/v1/workflows/{key}/events",
            new WorkflowEventBody(eventName, data ?? new { }),
            headers: null,
            "notifyservice.workflows.post_workflow_event",
            ct);

    /// <summary>
    /// Promotes a workflow from the Test environment to Live.
    /// Pass <paramref name="dryRun"/> <c>true</c> to preview the diff without writing.
    /// </summary>
    /// <param name="key">The stable workflow key (e.g. <c>"invoice_paid"</c>).</param>
    /// <param name="dryRun">When <c>true</c> returns the computed diff without applying any changes.</param>
    /// <param name="includeTemplates">
    /// Optional list of template keys to promote alongside the workflow.
    /// When <c>null</c> the server uses its default inclusion rules.
    /// </param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>The promotion result including the diff and whether the change was applied.</returns>
    public async Task<PromotionResult> PromoteAsync(
        string key,
        bool dryRun = false,
        IReadOnlyList<string>? includeTemplates = null,
        CancellationToken ct = default)
    {
        var request = new PromoteWorkflowRequest(dryRun, includeTemplates);
        (HttpResponseMessage response, PromotionResult body) = await _http.PostAsync(
            $"/v1/workflows/{Uri.EscapeDataString(key)}/promote",
            request,
            NotifyJsonContext.Default.PromoteWorkflowRequest,
            NotifyJsonContext.Default.PromotionResult,
            extraHeaders: null,
            activityName: "notifyservice.workflows.promote",
            ct);
        response.Dispose();
        return body;
    }
}
