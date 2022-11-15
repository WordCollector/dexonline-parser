## 2.0.0 (Unreleased)

FEATURES:

- Implement parsing of the inflection tab:
  - Headers:
    - Tags
    - Lemma
    - Type

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
