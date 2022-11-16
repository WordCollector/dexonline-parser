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
