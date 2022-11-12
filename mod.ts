import { CheerioAPI, load } from 'cheerio';
import { ContentTabs, LemmaElement, Links, Selectors, zip } from './src/mod.ts';

namespace Dexonline {
	export async function get(word: string): Promise<Array<LemmaElement> | undefined> {
		const response = await fetch(Links.definition(word));
		if (!response.ok) return undefined;

		const body = await response.text();
		return parse(body);
	}

	export function parse(body: string): Array<LemmaElement> {
		const $ = load(body);

		const entries = parseEntries($);

		console.debug(entries);

		return entries;
	}

	function parseEntries($: CheerioAPI): Array<LemmaElement> {
		const synthesis = $(Selectors.contentTab(ContentTabs.Synthesis));

		const headersBodies = zip(
			synthesis.find(Selectors.contentTabs.synthesis.header).toArray(),
			synthesis.find(Selectors.contentTabs.synthesis.body).toArray(),
		);

		return headersBodies.map(
			([header, body]) => ({ header: $(header), body: $(body) }),
		);
	}
}

export { Dexonline };
