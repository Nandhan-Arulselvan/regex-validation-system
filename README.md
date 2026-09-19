# Regex-Based Validation System

## Project description

**Regex-Based Validation System: URL Validator & Strong Password Policy Enforcer** is a frontend-only Models of Computation project. It demonstrates JavaScript regular expressions recognizing structured input and producing an acceptance/rejection decision. It includes a URL syntax validator and a live strong-password policy enforcer.

## Problem statement and objectives

Applications need input with known structure. This project shows how regex can describe that structure without listing all acceptable strings, and connects the result to regular languages and finite automata. Its objectives are to explain regex syntax, demonstrate two genuine `RegExp` validators, make patterns and their breakdown visible, and provide presentation-ready feedback and test cases.

## Technologies

- HTML5, CSS3, Vanilla JavaScript
- JavaScript `RegExp`; no framework, backend, API, database, or dependency

## Structure

```text
├── index.html                 # Academic landing page and regex theory
├── url-validator.html         # URL explanation and interactive validator
├── password-validator.html    # Password explanation and live validator
├── css/style.css              # Shared responsive design
└── js/
    ├── main.js                # Shared mobile navigation
    ├── url-validator.js       # URL regex and component feedback
    └── password-validator.js  # Password regex and live checks
```

## URL validator

```js
/^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i
```

This project-defined expression requires `http://` or `https://`, a domain and TLD; it permits optional subdomains, a port, path, query, and fragment. `^` and `$` anchor a full-input check. Validation is syntactic only: it does not test if the address exists.

## Password policy enforcer

Policy: minimum 12 characters, at least one uppercase letter, lowercase letter, digit, and special character; whitespace prohibited.

```js
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~])[^\s]{12,}$/
```

Positive lookaheads require each character category without consuming it. `[^\s]{12,}` prohibits whitespace and enforces the minimum length. The interface evaluates every requirement separately as the user types.

## Models of Computation connection

A regular expression describes a **regular language**, a set of strings with finite, repeatable structure. Finite automata recognize regular languages: a DFA has exactly one next state for each input symbol, while an NFA may have multiple possible next states. The project illustrates:

```text
Regular Expression → Regular Language → Pattern Matching → Input String → Accept / Reject
```

```text
L_URL = { w | w matches the project's URL regular expression }
L_PASSWORD = { w | w satisfies the password-policy regular expression }
```

Finite automata are the theory behind regular languages; the project does not claim every JavaScript engine literally converts all regex to a DFA.

## Test cases

- Valid URLs: `https://example.com`, `https://www.example.com`, `https://example.com:8080/api`, `https://www.example.com/search?q=regex`, `https://example.com/page#section`
- Invalid URLs: `example`, `htp://example.com`, `https://`, `https://.com`, `https://example`
- Passwords: `password123` fails; `Password123` fails; `Password123!` passes at the 12-character minimum; `Password 123!` fails due to whitespace; `Password123!@` passes.

## Run the project

Open `index.html` in a modern browser. The static site needs no installation or backend. Navigate through the header and click the included test cases during a demonstration.

## Future improvements

- Add state diagrams for simplified languages.
- Add copy-pattern and test-history controls.
- Expand internationalized domain support.
- Add accessibility preference controls.
