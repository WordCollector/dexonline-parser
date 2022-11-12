## A lightweight Dexonline.ro parser to gather information about words in the Romanian language.

### Usage

The simplest way of using the parser is as follows:

```ts
const results = await Dexonline.get('word');
```

Alternatively, you can parse HTML of the website directly, bypassing the fetch step as follows:

```ts
// ...
const results = Dexonline.parse(htmlString);
```
