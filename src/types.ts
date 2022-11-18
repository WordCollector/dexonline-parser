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

/** Specifies the strictness of word matching. */
enum MatchingModes {
	/** Consider only lemmas that match the search term exactly. */
	Strict,

	/** Consider all lemmas similar to the search term. */
	Lax,
}

/** Defines the available options for getting a word from the dictionary. */
interface ParserOptions {
	/**
	 * Specifies the mode to use by the parser for matching results to the search term.
	 *
	 * @defaultValue `SearchModes.Lax`
	 */
	mode: MatchingModes;

	/** Configures Dexonline's response. */
	flags: DictionaryFlags;
}

/**
 * Bit-based flags for configuring the dictionary and the results sent back by it.
 *
 * @privateRemarks
 * At the time of writing, there are just 5 options.
 * The 5th option ('always show advanced search bar') has no function outside of UI.
 * If for any case there were a need to add support for this option, its bit value is __64__.
 * The preferences with bit values 16, 32 and 128 are no longer used.
 */
enum DictionaryFlags {
	/** No flags. */
	None = 0,

	/**
	 * Replace letters with the comma diacritic ('ș', 'ț') with their cedilla variants ('ş', 'ţ').
	 */
	UseCedillas = 1,

	/**
	 * Do not include words that are identical except for diacritics.
	 *
	 * For example, without this flag enabled, a query for the word 'ca' will also return 'că'.
	 */
	MatchDiacritics = 2,

	/**
	 * Use the orthography from before the 1993 reform. (sînt, cînd, rîu, vîjîi)
	 */
	UsePreReformOrthography = 4,

	/**
	 * Return entries only from normative dictionaries published by the Institute of Linguistics
	 * (Institutul de Lingvistică) of the Romanian Academy (Academia Română).
	 *
	 * Enabling this flag will ensure that the only results provided are from the latest editions
	 * of the DEX and the DOOM.
	 *
	 * @remarks
	 * DEX - Explanatory dictionary of the Romanian language (Dicționarul explicativ al limbii
	 * române)
	 * DOOM - Orthographic, orthoepic and morphological dictionary of the Romanian language
	 * (Dicționarul ortografic, ortoepic și morfologic al limbii române)
	 */
	SearchOnlyNormativeDictionaries = 8,
}

export { ContentTabs, DictionaryFlags, MatchingModes };
export type { LemmaElement, ParserOptions };
