import { Cheerio, CheerioAPI, Element, load } from 'cheerio';
import { ContentTabs, Links, Selectors, zip } from './src/mod.ts';

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

		interface Body {
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
				const contents = row.find(Selectors.contentTabs.synthesis.body.row.contents.element);

				const tags = contents.find(Selectors.contentTabs.synthesis.body.row.contents.tags).children().map((
					_index,
					tag,
				) => $(tag).text())
					.toArray();
				const text = contents.find(Selectors.contentTabs.synthesis.body.row.contents.text).text().trim();
				const sources = contents.find(Selectors.contentTabs.synthesis.body.row.contents.sources).children().map((
					_index,
					tag,
				) => $(tag).text().trim())
					.toArray();

				return { tags, value: text, sources };
			}
		}

		interface Etymology extends Row.Row {}

		export function parse($: CheerioAPI): Array<Lemma> {
			const synthesis = $(Selectors.contentTab(ContentTabs.Synthesis));

			const headerBodyTuples = zip(
				synthesis.find(Selectors.contentTabs.synthesis.header.element).toArray(),
				synthesis.find(Selectors.contentTabs.synthesis.body.element).toArray(),
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
			const typeElement = header.find(Selectors.contentTabs.synthesis.header.type);
			const type = typeElement.text().trim().toLowerCase();

			typeElement.remove();

			const [singular, _plural] = <[string, string]> header.text().trim().split(', ');
			const lemma = singular;

			return { type, lemma };
		}

		export function parseBody($: CheerioAPI, body: Cheerio<Element>): Body {
			const etymology = getEtymology($, body);

			return { etymology };
		}

		function getEtymology($: CheerioAPI, body: Cheerio<Element>): Array<Etymology> {
			const section = body.find(Selectors.contentTabs.synthesis.body.etymology.element);

			const entries = section.find(Selectors.contentTabs.synthesis.body.etymology.tree).children();
			const rows = entries.find(Selectors.contentTabs.synthesis.body.row.element);

			return rows.map((_index, row) => Row.parse($, $(row))).toArray();
		}
	}
}

export { Dexonline };
