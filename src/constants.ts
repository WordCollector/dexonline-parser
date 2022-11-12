import { ContentTabs } from './types.ts';

namespace Links {
	export const definition = (word: string) => `https://dexonline.ro/definitie/${word}`;
}

namespace Selectors {
	export const contentTab = (tab: ContentTabs) => `#tab_${tab}`;
	export const contentTabs = {
		synthesis: {
			header: 'h3[class=tree-heading] > div',
			body: 'div[class=tree-body]',
		},
	};
}

export { Links, Selectors };
