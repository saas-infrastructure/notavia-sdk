/**
 * Recursively converts all object keys from camelCase to snake_case.
 * Arrays, primitives, `null`, and `undefined` are passed through unchanged.
 */
export function toSnake(input: unknown): unknown {
  if (input === null || input === undefined) return input;
  if (Array.isArray(input)) return input.map(toSnake);
  if (typeof input !== "object") return input;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input as object)) {
    out[snakeCase(k)] = toSnake(v);
  }
  return out;
}

/**
 * Recursively converts all object keys from snake_case to camelCase.
 * Arrays, primitives, `null`, and `undefined` are passed through unchanged.
 */
export function toCamel(input: unknown): unknown {
  if (input === null || input === undefined) return input;
  if (Array.isArray(input)) return input.map(toCamel);
  if (typeof input !== "object") return input;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input as object)) {
    out[camelCase(k)] = toCamel(v);
  }
  return out;
}

/** Converts a single camelCase identifier to snake_case. */
function snakeCase(s: string): string {
  return s.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
}

/** Converts a single snake_case identifier to camelCase. */
function camelCase(s: string): string {
  return s.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}
