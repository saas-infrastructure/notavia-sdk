import { describe, it, expect } from "vitest";
import { toCamel, toSnake } from "../src/case.js";

describe("case mappers", () => {
  it("converts camelCase keys to snake_case", () => {
    const input = { helloWorld: 1, nestedThing: { someKey: "x", arr: [{ aB: 2 }] } };
    expect(toSnake(input)).toEqual({
      hello_world: 1,
      nested_thing: { some_key: "x", arr: [{ a_b: 2 }] },
    });
  });

  it("converts snake_case keys to camelCase", () => {
    const input = { hello_world: 1, nested_thing: { some_key: "x", arr: [{ a_b: 2 }] } };
    expect(toCamel(input)).toEqual({
      helloWorld: 1,
      nestedThing: { someKey: "x", arr: [{ aB: 2 }] },
    });
  });

  it("does not transform string values", () => {
    const input = { templateKey: "welcome_email", htmlBody: "<p>hi</p>" };
    const out = toSnake(input) as Record<string, unknown>;
    expect(out.template_key).toBe("welcome_email");
    expect(out.html_body).toBe("<p>hi</p>");
  });

  it("passes null and undefined through", () => {
    expect(toSnake(null)).toBe(null);
    expect(toSnake(undefined)).toBe(undefined);
    expect(toCamel(null)).toBe(null);
    expect(toCamel(undefined)).toBe(undefined);
  });

  it("round-trips an object through snake → camel", () => {
    const original = { someKey: 1, arr: [{ otherKey: 2 }] };
    expect(toCamel(toSnake(original))).toEqual(original);
  });
});
