export function fakeJwt(expSecondsFromNow: number): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    iss: "00000000-0000-0000-0000-000000000000",
    sub: "u_test",
    scope: "inbox:prefs",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expSecondsFromNow,
  }));
  return `${header}.${payload}.fake-signature`;
}
