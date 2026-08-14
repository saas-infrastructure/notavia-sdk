type Handler = (url: string, init: RequestInit) => Promise<Response> | Response;

export class FakeFetch {
  readonly calls: Array<{ url: string; method: string; body: unknown; headers: Record<string, string> }> = [];
  private handlers: Array<{ match: (url: string, init: RequestInit) => boolean; handler: Handler }> = [];

  when(match: (url: string, init: RequestInit) => boolean, handler: Handler): this {
    this.handlers.push({ match, handler });
    return this;
  }

  whenUrl(method: string, urlSuffix: string, handler: Handler): this {
    return this.when(
      (u, i) => (i.method ?? "GET") === method && u.endsWith(urlSuffix),
      handler,
    );
  }

  asFetch: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : (input as Request).url;
    const i = init ?? {};
    const rawHeaders = new Headers(i.headers as HeadersInit);
    const headers: Record<string, string> = {};
    rawHeaders.forEach((value, key) => { headers[key.toLowerCase()] = value; });
    let body: unknown;
    if (typeof i.body === "string") {
      try { body = JSON.parse(i.body); } catch { body = i.body; }
    }
    this.calls.push({ url, method: (i.method ?? "GET").toUpperCase(), body, headers });
    for (const { match, handler } of this.handlers) {
      if (match(url, i)) return handler(url, i);
    }
    return new Response("not handled", { status: 599 });
  };

  json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }
}
