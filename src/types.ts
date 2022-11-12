import { Cheerio, Element } from 'cheerio';

/** Defines the available Dexonline content tabs. */
enum ContentTabs {
	/** Matches for the searched word. */
	Lemmas = 0,

	/** Inflection tables corresponding to matched lemmas. */
	Inflection = 1,

	/** The most relevant lemmas arranged in a format comprehensible to the user. */
	Synthesis = 2,

	/** Articles relevant for the searched word. */
	Articles = 3,
}

interface LemmaElement {
	header: Cheerio<Element>;
	body: Cheerio<Element>;
}

export { ContentTabs };
export type { LemmaElement };
