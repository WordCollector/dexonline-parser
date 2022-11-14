import { assertEquals, assertNotEquals } from 'std/testing/asserts.ts';
import { Dexonline } from '../mod.ts';

Deno.test('parser', async (test) => {
	await test.step('polysemantic', async () => {
		const entries = await getEntries('da');

		assertEquals(entries.length, 8);

		const first = entries.shift()!;
		assertEquals(first, {
			type: 'adverb',
			lemma: 'da',
			definitions: [
				{
					tags: [],
					sources: [`DEX '09`, 'MDA2', `DEX '98`, 'DLRLC'],
					value:
						'Cuvânt care se folosește pentru a răspunde afirmativ la o întrebare sau pentru a exprima o afirmație, un consimțământ.',
					definitions: [{
						tags: [],
						sources: ['MDA2'],
						value:
							'(În dialog; adesea cu repetarea propoziției sau a unei părți din propoziție) Exprimă o afirmație întărită.',
						definitions: [],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['MDA2'],
						value: 'Reia predicatul unei propoziții negative în propoziția pozitivă care urmează.',
						definitions: [],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['NODEX'],
						value: '(Atribuie celor spuse valoare afirmativă) De acord; așa este.',
						definitions: [],
						relations: {
							synonyms: ['exact', 'întocmai'],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['NODEX'],
						value: '(Cu sens interogativ se folosește pentru a căpăta răspuns la o alternativă) Așa sau altfel?',
						definitions: [],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['NODEX'],
						value:
							'(La începutul unei propoziții semnalează că vorbitorul și-a amintit de ceva) Fiindcă a venit vorba.',
						definitions: [],
						relations: {
							synonyms: ['apropo'],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['NODEX'],
						value: 'Întru totul.',
						definitions: [],
						relations: {
							synonyms: ['exact', 'întocmai'],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: ['(și) substantivat', 'neutru'],
						sources: ['MDA2'],
						value: 'Răspuns afirmativ.',
						definitions: [{
							tags: ['prin extensiune'],
							sources: ['MDA2'],
							value: 'Afirmație.',
							definitions: [],
							relations: {
								synonyms: ['afirmație'],
								antonyms: [],
								diminutives: [],
								augmentatives: [],
							},
						}],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}],
					relations: {
						synonyms: [],
						antonyms: ['nu'],
						diminutives: [],
						augmentatives: [],
					},
				},
			],
			etymology: [{
				tags: ['limba rusă', 'limba sârbă, croată'],
				sources: [`DEX '09`, 'MDA2', `DEX '98`, 'NODEX'],
				value: 'da',
			}, {
				tags: ['limba bulgară', 'limba slavă (veche)'],
				sources: [`DEX '09`, 'MDA2', `DEX '98`, 'NODEX'],
				value: 'da, да',
			}],
		});

		const entriesWithoutDefinitions = entries.map((entry) => ({ ...entry, definitions: [] }));

		assertEquals(entriesWithoutDefinitions, [
			{
				type: 'verb',
				lemma: 'da',
				definitions: [],
				etymology: [{
					tags: ['limba latină'],
					sources: [`DEX '09`, `DEX '98`, 'NODEX'],
					value: 'dare',
				}],
			},
			{
				type: 'adverb',
				lemma: 'dar',
				definitions: [],
				etymology: [{
					tags: ['necunoscută'],
					sources: [`DEX '09`, `DEX '98`],
					value: '',
				}],
			},
			{
				type: 'conjuncție',
				lemma: 'dar',
				definitions: [],
				etymology: [{
					tags: ['necunoscută'],
					sources: [`DEX '09`, `DEX '98`],
					value: '',
				}],
			},
			{
				type: 'adverb',
				lemma: 'darn',
				definitions: [],
				etymology: [{
					tags: ['limba italiană'],
					sources: [`DEX '09`, `DEX '98`, 'DN'],
					value: 'indarnó',
				}],
			},
			{
				type: 'prefix',
				lemma: 'deca',
				definitions: [],
				etymology: [{
					tags: ['limba neogreacă'],
					sources: [`DEX '09`, `DEX '98`, 'DN'],
					value: 'déka',
				}],
			},
			{
				type: 'interjecție',
				lemma: 'de / dec / deh',
				definitions: [],
				etymology: [{
					tags: ['onomatopee'],
					sources: [`DEX '09`, 'NODEX'],
					value: '',
				}],
			},
			{
				type: 'prepoziție',
				lemma: 'de',
				definitions: [],
				etymology: [{
					tags: ['limba latină'],
					sources: [`DEX '09`],
					value: 'de',
				}],
			},
		]);
	});

	await test.step('monosemantic', async () => {
		const entries = await getEntries('întregime');

		assertEquals(entries, [
			{
				type: 'substantiv feminin',
				lemma: 'întregime',
				definitions: [{
					tags: [],
					sources: [`DEX '09`, `DEX '98`, 'DLRLC'],
					value: 'Calitatea de a fi întreg.',
					definitions: [{
						tags: ['concretizat'],
						sources: [`DEX '09`, `DEX '98`, 'DLRLC'],
						value: 'Ansamblul elementelor care constituie un tot.',
						definitions: [],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}],
					relations: {
						synonyms: ['deplinătate', 'integritate', 'plenitudine', 'totalitate'],
						antonyms: [],
						diminutives: [],
						augmentatives: [],
					},
				}],
				etymology: [{
					tags: [],
					sources: [`DEX '09`, `DEX '98`],
					value: 'Întreg + sufix -ime.',
				}],
			},
		]);
	});
});

type NonNullablePromise<T> = Promise<NonNullable<Awaited<T>>>;
type GetFunction = typeof Dexonline.get;

const getEntries = async (
	...args: Parameters<GetFunction>
): NonNullablePromise<ReturnType<GetFunction>> => {
	const entriesOrUndefined = await Dexonline.get(...args);
	assertNotEquals(entriesOrUndefined, undefined);

	return entriesOrUndefined!;
};
