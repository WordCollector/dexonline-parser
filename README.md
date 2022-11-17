## Monorepo containing various tools to work with and aggregate information from Dexonline.

### Structure

This repository is broken up into multiple packages stored in the `/packages`
subdirectory:

`/parser`

A two-in-one scraper + parser that allows you to fetch information about a given
word directly from Dexonline.

#### Development

Development for the tools listed above is done using the latest production
version of Deno.

Before committing changes, make sure that you have run the `dnt.ts` script in
the subdirectory of the package you contributed to. This ensures that your
commits won't require additional work or further changes to eliminate errors
while generating a Node package.

#### Licensing

Code within this repository is licensed under the permissive
[MIT License](https://choosealicense.com/licenses/mit/). Feel free to use it
commercially, distribute it, modify it or do whatever you see fit with it.
However, keep in mind that there is no warranty or liability of any kind on the
contributors' part.
