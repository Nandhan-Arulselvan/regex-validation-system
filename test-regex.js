// Lightweight regression checks for the actual patterns used by the two modules.
const urlPattern = /^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~])[^\s]{12,}$/;

const cases = [
  ['URL', 'https://example.com', true, urlPattern], ['URL', 'https://www.example.com', true, urlPattern],
  ['URL', 'https://example.com:8080/api', true, urlPattern], ['URL', 'https://www.example.com/search?q=regex', true, urlPattern],
  ['URL', 'https://example.com/page#section', true, urlPattern], ['URL', 'example', false, urlPattern],
  ['URL', 'htp://example.com', false, urlPattern], ['URL', 'https://', false, urlPattern], ['URL', 'https://.com', false, urlPattern], ['URL', 'https://example', false, urlPattern], ['URL', '', false, urlPattern],
  ['Password', '', false, passwordPattern], ['Password', 'password123', false, passwordPattern],
  ['Password', 'Password123', false, passwordPattern], ['Password', 'Password123!', true, passwordPattern],
  ['Password', 'Password 123!', false, passwordPattern], ['Password', 'Password123!@', true, passwordPattern],
  ['Password', 'RegexRocks2026#', true, passwordPattern], ['Password', 'A_securePass9!', true, passwordPattern]
];

let failures = 0;
for (const [kind, value, expected, pattern] of cases) {
  const actual = pattern.test(value);
  if (actual !== expected) { failures++; console.error(`FAIL: ${kind} ${JSON.stringify(value)} expected ${expected}, received ${actual}`); }
}
if (failures) process.exit(1);
console.log(`Passed ${cases.length} regex regression checks.`);
