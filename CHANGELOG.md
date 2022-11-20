## 3.2.2

CHANGES:

- Delete import map entirely due to issues arising from it being used within a standalone package such as
  `dexonline-parser`.

## 3.2.1

IMPROVEMENTS:

- Make import map relative.

## 3.2.0

IMPROVEMENTS:

- Remove `undici` shim from the Deno to Node conversion script.

## 3.1.0

IMPROVEMENTS:

- Improve exports.
- Un-nest namespaces.

## 3.0.0

IMPROVEMENTS:

- Improve `README.md` by adding more examples.

BREAKING CHANGES:

- Rename types:
  - `SearchOptions` -> `ParserOptions`
  - `SearchModes` -> `MatchingModes`

## 2.1.0

FEATURES:

- Add support for dictionary preferences:
  - Use cedillas instead of commas
  - Match diacritics exactly
  - Pre-reform orthography
  - Search normative dictionaries

FIXES:

- Handle case where there is no inflection table for a given term.

## 2.0.0

FEATURES:

- Implement parsing of the inflection tab:
  - Headers:
    - Tags
    - Lemma
    - Type
  - Body:
    - Table

## 1.0.1

OTHER:

- Add missing tests:
  - For when a word does not exist.
  - For when there is no synthesis section generated for a word.

## 1.0.0

FEATURES:

- Add parser options:
  - Modes:
    - Strict (Match identical)
    - Lax (Match similar)
- Implement parsing of the synthesis tab:
  - Headers:
    - Lemma
    - Type
  - Body:
    - Examples
    - Definitions
    - Expressions
    - Relations
    - Etymology
