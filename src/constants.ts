import { ContentTabs } from './types.ts';

namespace Links {
	export const definition = (word: string) => `https://dexonline.ro/definitie/${word}`;
}

namespace Expressions {
	export const treeType = /^type-(\w+)$/;
	export const relationType = /^me-(\d+)$/;
}

namespace Selectors {
	export const contentTab = (tab: ContentTabs) => `#tab_${tab}`;
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
	};
}

export { Expressions, Links, Selectors };
