import { assertEquals, assertNotEquals } from 'std/testing/asserts.ts';
import { Dexonline } from '../mod.ts';

Deno.test('parser', async (test) => {
	await test.step('polysemantic', async () => {
		const entries = await getEntries('da');

		assertEquals(entries, [
			{
				type: 'adverb',
				lemma: 'da',
				etymology: [{
					tags: ['limba rusă', 'limba sârbă, croată'],
					sources: [`DEX '09`, 'MDA2', `DEX '98`, 'NODEX'],
					value: 'da',
				}, {
					tags: ['limba bulgară', 'limba slavă (veche)'],
					sources: [`DEX '09`, 'MDA2', `DEX '98`, 'NODEX'],
					value: 'da, да',
				}],
			},
			{
				type: 'verb',
				lemma: 'da',
				etymology: [{
					tags: ['limba latină'],
					sources: [`DEX '09`, `DEX '98`, 'NODEX'],
					value: 'dare',
				}],
			},
			{
				type: 'adverb',
				lemma: 'dar',
				etymology: [{
					tags: ['necunoscută'],
					sources: [`DEX '09`, `DEX '98`],
					value: '',
				}],
			},
			{
				type: 'conjuncție',
				lemma: 'dar',
				etymology: [{
					tags: ['necunoscută'],
					sources: [`DEX '09`, `DEX '98`],
					value: '',
				}],
			},
			{
				type: 'adverb',
				lemma: 'darn',
				etymology: [{
					tags: ['limba italiană'],
					sources: [`DEX '09`, `DEX '98`, 'DN'],
					value: 'indarnó',
				}],
			},
			{
				type: 'prefix',
				lemma: 'deca',
				etymology: [{
					tags: ['limba neogreacă'],
					sources: [`DEX '09`, `DEX '98`, 'DN'],
					value: 'déka',
				}],
			},
			{
				type: 'interjecție',
				lemma: 'de / dec / deh',
				etymology: [{
					tags: ['onomatopee'],
					sources: [`DEX '09`, 'NODEX'],
					value: '',
				}],
			},
			{
				type: 'prepoziție',
				lemma: 'de',
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
