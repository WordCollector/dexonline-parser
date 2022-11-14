import { Cheerio, CheerioAPI, Element, load } from 'cheerio';
import { ContentTabs, Expressions, Links, Selectors, valueToEnum, zip } from './src/mod.ts';

namespace Dexonline {
	export async function get(word: string): Promise<Array<Synthesis.Lemma> | undefined> {
		const response = await fetch(Links.definition(word));
		if (!response.ok) return undefined;

		const body = await response.text();
		return parse(body);
	}

	export function parse(body: string): Array<Synthesis.Lemma> {
		const $ = load(body);

		const entries = Synthesis.parse($);

		return entries;
	}

	namespace Synthesis {
		export interface Lemma extends Header, Body {}

		interface Header {
			type: string;
			lemma: string;
		}

		interface Tree {
			definitions: Array<Definition>;
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

		interface Definition extends Row.Row {
			definitions: Array<Definition>;
			relations: Relations;
		}
		interface Etymology extends Row.Row {}

		export function parse($: CheerioAPI): Array<Lemma> {
			const synthesis = $(Selectors.contentTab(ContentTabs.Synthesis));

			const headerBodyTuples = zip(
				synthesis
					.children(Selectors.contentTabs.synthesis.header.element)
					.children(Selectors.contentTabs.synthesis.header.container).toArray(),
				synthesis.children(Selectors.contentTabs.synthesis.body.element).toArray(),
			);

			return headerBodyTuples.map(
				([headerElement, bodyElement]) => {
					const header = parseHeader($(headerElement));
					const body = parseBody($, $(bodyElement));

					return { ...header, ...body };
				},
			);
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
			const { definitions } = getTree($, body);
			const etymology = getEtymology($, body);

			return { definitions, etymology };
		}

		enum TreeTypes {
			Definition = 'meaning',
		}

		export function getTree($: CheerioAPI, body: Cheerio<Element>): Tree {
			const section = body.children(Selectors.contentTabs.synthesis.body.tree.element);
			const subtrees = section.children().toArray();

			if (subtrees.length === 0) {
				return { definitions: [] };
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
						case TreeTypes.Definition: {
							subtrees.definitions.push(subtree);
							break;
						}
					}

					return subtrees;
				},
				{ definitions: [] },
			);

			return {
				definitions: subtreesSorted.definitions.map((definition) => getBranch($, $(definition), TreeTypes.Definition)),
			};
		}

		function getBranch<T extends TreeTypes, R extends Row.Row = T extends TreeTypes.Definition ? Definition : never>(
			$: CheerioAPI,
			branch: Cheerio<Element>,
			type: T,
		): R {
			const root = $(branch.children(Selectors.contentTabs.synthesis.body.row.element));
			const row = Row.parse($, root);
			const { definitions } = getTree($, branch);

			let result: unknown;
			switch (type) {
				case TreeTypes.Definition: {
					const relations = getRelations($, root);
					result = { ...row, definitions, relations };
				}
			}

			return result as R;
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

export { Dexonline };
