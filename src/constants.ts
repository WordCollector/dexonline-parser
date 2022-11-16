import { ContentTabs } from './types.ts';

namespace Links {
	export const definition = (word: string): string => `https://dexonline.ro/definitie/${word}`;
}

namespace Expressions {
	export const treeType = /^type-(\w+)$/;
	export const relationType = /^me-(\d+)$/;
	export const tableLemmaWithIndex = /((?:[a-zA-ZăĂâÂîÎșȘțȚ-]+))(<sup>(\d+)<\/sup>)?/;
}

namespace Selectors {
	export const contentTab = (tab: ContentTabs): string => `#tab_${tab}`;
	export const contentTabs = {
		synthesis: {
			header: {
				element: 'h3[class=tree-heading]',
				container: 'div',
				type: 'span[class=tree-pos-info]',
			},
			body: {
				element: 'div[class=tree-body]',
				row: {
					element: 'div[class=meaningContainer]',
					contents: {
						element: 'div[class=meaning-row]',
						tags: 'span[class="tag-group meaning-tags"]',
						text: 'span[class="def html"]',
						sources: 'span[class="meaning-sources tag-group"]',
					},
					relations: {
						element: 'div[class=meaning-relations]',
					},
				},
				tree: {
					element: 'ul[class=meaningTree]',
				},
				etymology: {
					element: 'div[class=etymology]',
					tree: 'ul[class=meaningTree]',
				},
			},
		},
		inflection: {
			entry: {
				element: 'div[class=card-body]',
				table: {
					element: 'div[class=paraLexeme]',
					header: {
						element: 'div',
						lemma: 'span[class=lexemeName]',
						// There is indeed a trailing whitespace here.
						// Do not ask me why: I don't know.
						tag: 'span[class="tag "]',
					},
					body: {
						element: 'table[class=lexeme]',
					},
				},
			},
		},
	};
}

export { Expressions, Links, Selectors };
