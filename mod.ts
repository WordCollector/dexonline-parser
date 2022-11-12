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

		const entries = Synthesis.parseEntries($);

		return entries;
	}

	namespace Synthesis {
		export interface Lemma extends Header {}

		interface Header {
			type: string;
			lemma: string;
		}

		export function parseEntries($: CheerioAPI): Array<Lemma> {
			const synthesis = $(Selectors.contentTab(ContentTabs.Synthesis));

			const headerBodyTuples = zip(
				synthesis.find(Selectors.contentTabs.synthesis.header.element).toArray(),
				synthesis.find(Selectors.contentTabs.synthesis.body.element).toArray(),
			);

			return headerBodyTuples.map(
				([headerElement, _bodyElement]) => {
					const header = parseHeader($(headerElement));

					return { ...header };
				},
			);
		}

		export function parseHeader(element: Cheerio<Element>): Header {
			const typeElement = element.find(Selectors.contentTabs.synthesis.header.type);
			const type = typeElement.text().trim().toLowerCase();

			typeElement.remove();

			const [singular, _plural] = <[string, string]> element.text().trim().split(', ');
			const lemma = singular;

			return { type, lemma };
		}
	}
}

export { Dexonline };
