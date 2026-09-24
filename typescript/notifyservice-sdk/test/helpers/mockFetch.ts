export interface MockResponse {
  status: number;
  body?: string | object;
  headers?: Record<string, string>;
  contentType?: string;
}

export interface MockFetchResult {
  fetch: typeof fetch;
  calls: Array<{ url: string; method: string; headers: Record<string, string>; body: string | null }>;
}

export function mockFetch(...responses: MockResponse[]): MockFetchResult {
  const calls: MockFetchResult["calls"] = [];
  const queue = [...responses];
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    const headers: Record<string, string> = {};
    if (init?.headers) {
      const hdrs = init.headers;
      if (hdrs instanceof Headers) {
        hdrs.forEach((v, k) => { headers[k.toLowerCase()] = v; });
      } else if (Array.isArray(hdrs)) {
        for (const [k, v] of hdrs) headers[k.toLowerCase()] = v;
      } else {
        for (const [k, v] of Object.entries(hdrs)) headers[k.toLowerCase()] = String(v);
      }
    }
    calls.push({
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers,
      body: typeof init?.body === "string" ? init.body : null,
    });
    const r = queue.shift();
    if (!r) {
      throw new Error(`mockFetch: no responder queued for ${init?.method ?? "GET"} ${url}`);
    }
    const isNoContent = r.status === 204;
    const body = isNoContent ? null : (typeof r.body === "string" ? r.body : JSON.stringify(r.body ?? {}));
    return new Response(body, {
      status: r.status,
      headers: { "Content-Type": r.contentType ?? "application/json", ...(r.headers ?? {}) },
    });
  };
  return { fetch: fetchImpl, calls };
}
