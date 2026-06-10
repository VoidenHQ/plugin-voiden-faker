> A plugin for [Voiden](https://github.com/VoidenHQ) — the developer-first API client.

# Voiden Faker

Generate fake data in your API requests using [Faker.js](https://fakerjs.dev). Use `{{faker.*}}` placeholders anywhere in your request — they are replaced with fresh random values on every send.

## Features

- Faker.js-powered random data generation
- Runs as a pre-send hook so faker values are visible to scripts
- Autocomplete suggestions for `{{faker.*}}` placeholders in the editor
- Works in URL, headers, query params, and body

## Usage

Type `{{faker.` anywhere in your request — the editor will suggest available faker methods. Examples:

```
{{faker.internet.email}}
{{faker.person.fullName}}
{{faker.string.uuid}}
```
