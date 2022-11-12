import { ContentTabs } from './types.ts';

namespace Links {
	export const definition = (word: string) => `https://dexonline.ro/definitie/${word}`;
}

namespace Selectors {
	export const contentTab = (tab: ContentTabs) => `#tab_${tab}`;
	export const contentTabs = {
		synthesis: {
			header: {
        element: 'h3[class=tree-heading] > div',
        type: 'span[class=tree-pos-info]',
      },
			body: {
        element: 'div[class=tree-body]',
      },
		},
	};
}

export { Links, Selectors };
