import { Cheerio, CheerioAPI, Element, load } from 'cheerio';
import { ContentTabs, Expressions, Links, Selectors, valueToEnum, zip } from './src/mod.ts';

/** Specifies the strictness of word searches. */
enum SearchModes {
	/** Consider only lemmas that match the search term exactly. */
	Strict,

	/** Consider all lemmas similar to the search term. */
	Lax,
}

/** Defines the available options for getting a word from the dictionary. */
interface SearchOptions {
	/** The {@link SearchModes | mode} to use for searching the dictionary. Default: {@link SearchModes.Lax | Lax} */
	mode: SearchModes;
}

/** The default search options. */
const defaultSearchOptions: SearchOptions = {
	mode: SearchModes.Lax,
};

type SearchOptionsWithWord = SearchOptions & ({ mode: SearchModes.Lax } | { mode: SearchModes.Strict; word: string });

namespace Dexonline {
	export async function get(
		word: string,
		options: Partial<SearchOptions> = defaultSearchOptions,
	): Promise<Array<Synthesis.Lemma> | undefined> {
		const response = await fetch(Links.definition(word));
		if (!response.ok) return undefined;

		const body = await response.text();
		return parse(body, { ...defaultSearchOptions, word, ...options });
	}

	export function parse(
		body: string,
		options: SearchOptionsWithWord = { ...defaultSearchOptions, word: '' },
	): Array<Synthesis.Lemma> {
		const $ = load(body);

		const entries = Synthesis.parse($, { ...defaultSearchOptions, ...options });

		return entries;
	}

	namespace Synthesis {
		export interface Lemma extends Header, Body {}

		interface Header {
			type: string;
			lemma: string;
		}

		interface Tree {
			examples: Array<Example>;
			definitions: Array<Definition>;
			expressions: Array<Expression>;
		}

		interface Body extends Tree {
			etymology: Array<Etymology>;
		}

		interface WithMetadata<T> {
			tags: Array<string>;
			sources: Array<string>;
			value: T;
		}

		namespace Row {
			interface Contents extends WithMetadata<string> {}

			export interface Row extends Contents {}

			export function parse($: CheerioAPI, row: Cheerio<Element>): Row {
				const contents = getContents($, row);

				return { ...contents };
			}

			function getContents($: CheerioAPI, row: Cheerio<Element>): Contents {
				const section = row.children(Selectors.contentTabs.synthesis.body.row.contents.element);

				const tags = section.children(Selectors.contentTabs.synthesis.body.row.contents.tags).children().map((
					_index,
					tag,
				) => $(tag).text())
					.toArray();
				const text = section.children(Selectors.contentTabs.synthesis.body.row.contents.text).text().trim();
				const sources = section.children(Selectors.contentTabs.synthesis.body.row.contents.sources).children().map((
					_index,
					tag,
				) => $(tag).text().trim())
					.toArray();

				return { tags, value: text, sources };
			}
		}

		enum RelationTypes {
			Synonym = 'synonyms',
			Antonym = 'antonyms',
			Diminutive = 'diminutives',
			Augmentative = 'augmentatives',
		}

		const relationTypeNameToRelationType: Record<string, RelationTypes> = {
			'sinonime': RelationTypes.Synonym,
			'antonime': RelationTypes.Antonym,
			'diminutive': RelationTypes.Diminutive,
			'augmentative': RelationTypes.Augmentative,
		};

		type Relations = Record<
			typeof RelationTypes[keyof typeof RelationTypes],
			Array<string>
		>;

		interface Example extends Row.Row {}
		interface Definition extends Row.Row {
			definitions: Array<Definition>;
			examples: Array<Example>;
			expressions: Array<Expression>;
			relations: Relations;
		}
		interface Expression extends Row.Row {
			examples: Array<Example>;
			expressions: Array<Expression>;
			relations: Relations;
		}
		interface Etymology extends Row.Row {}

		export function parse($: CheerioAPI, options: SearchOptionsWithWord): Array<Lemma> {
			const synthesis = $(Selectors.contentTab(ContentTabs.Synthesis));

			const headerBodyTuples = zip(
				synthesis
					.children(Selectors.contentTabs.synthesis.header.element)
					.children(Selectors.contentTabs.synthesis.header.container).toArray(),
				synthesis.children(Selectors.contentTabs.synthesis.body.element).toArray(),
			);

			return <Array<Lemma>> headerBodyTuples.map<Lemma | undefined>(
				([headerElement, bodyElement]) => {
					const header = parseHeader($(headerElement));
					if (options.mode === SearchModes.Strict && header.lemma !== options.word) {
						return undefined;
					}

					const body = parseBody($, $(bodyElement));

					return { ...header, ...body };
				},
			).filter((entryOrUndefined) => !!entryOrUndefined);
		}

		export function parseHeader(header: Cheerio<Element>): Header {
			const typeElement = header.children(Selectors.contentTabs.synthesis.header.type);
			const type = typeElement.text().trim().toLowerCase();
			typeElement.remove();

			const [singular, _plural] = <[string, string]> header.text().trim().split(', ');
			const lemma = singular;

			return { type, lemma };
		}

		export function parseBody($: CheerioAPI, body: Cheerio<Element>): Body {
			const { examples, definitions, expressions } = getTree($, body);
			const etymology = getEtymology($, body);

			return { examples, definitions, expressions, etymology };
		}

		enum TreeTypes {
			Example = 'example',
			Definition = 'meaning',
			Expression = 'expression',
		}

		export function getTree($: CheerioAPI, body: Cheerio<Element>): Tree {
			const section = body.children(Selectors.contentTabs.synthesis.body.tree.element);
			const subtrees = section.children().toArray();

			if (subtrees.length === 0) {
				return { examples: [], definitions: [], expressions: [] };
			}

			const subtreesSorted = subtrees.reduce<Record<keyof Tree, Array<Element>>>(
				(subtrees, subtree) => {
					const typeString = $(subtree)
						.attr('class')
						?.split(' ')
						.find((className) => Expressions.treeType.test(className));
					if (!typeString) return subtrees;

					const [_match, typeName] = Expressions.treeType.exec(typeString)!;

					const type = valueToEnum(TreeTypes, typeName!);
					if (!type) return subtrees;

					switch (type) {
						case TreeTypes.Example: {
							subtrees.examples.push(subtree);
							break;
						}
						case TreeTypes.Definition: {
							subtrees.definitions.push(subtree);
							break;
						}
						case TreeTypes.Expression: {
							subtrees.expressions.push(subtree);
							break;
						}
					}

					return subtrees;
				},
				{ examples: [], definitions: [], expressions: [] },
			);

			return {
				examples: subtreesSorted.examples.map((example) => getBranch($, $(example), TreeTypes.Example)),
				definitions: subtreesSorted.definitions.map((definition) => getBranch($, $(definition), TreeTypes.Definition)),
				expressions: subtreesSorted.expressions.map((expression) => getBranch($, $(expression), TreeTypes.Expression)),
			};
		}

		function getBranch<T extends TreeTypes, R extends Row.Row>(
			$: CheerioAPI,
			branch: Cheerio<Element>,
			type: T,
		): R {
			const root = $(branch.children(Selectors.contentTabs.synthesis.body.row.element));
			const row = Row.parse($, root);

			if (type === TreeTypes.Example) {
				return row as R;
			}

			const sharedProperties = { ...row, relations: getRelations($, root) };
			const { examples, definitions, expressions } = getTree($, branch);

			if (type === TreeTypes.Expression) {
				return { ...sharedProperties, examples, expressions } as unknown as R;
			}

			return { ...sharedProperties, examples, definitions, expressions } as unknown as R;
		}

		function getRelations($: CheerioAPI, row: Cheerio<Element>): Relations {
			const section = row.children(Selectors.contentTabs.synthesis.body.row.relations.element);
			const groups = section.children().toArray();

			return groups.reduce<Relations>(
				(relations, group) => {
					if (!group.firstChild) return relations;

					const typeElement = $(group).children().first().remove();
					const typeString = typeElement.text().trim().toLowerCase().replace(':', '');

					const type = relationTypeNameToRelationType[typeString];
					if (!type) return relations;

					const terms = $(group).children().toArray()
						.map((node) => $(node).text())
						.map((term) => term.trim())
						.filter((term) => term.length !== 0);

					relations[type!].push(...terms);

					return relations;
				},
				{ synonyms: [], antonyms: [], diminutives: [], augmentatives: [] },
			);
		}

		function getEtymology($: CheerioAPI, body: Cheerio<Element>): Array<Etymology> {
			const section = body.children(Selectors.contentTabs.synthesis.body.etymology.element);

			const entries = section.children(Selectors.contentTabs.synthesis.body.etymology.tree).children();
			const rows = entries.children(Selectors.contentTabs.synthesis.body.row.element);

			return rows.map((_index, row) => Row.parse($, $(row))).toArray();
		}
	}
}

export { Dexonline, SearchModes };
export type { SearchOptions };
