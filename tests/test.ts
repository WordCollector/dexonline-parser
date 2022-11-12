import { assertEquals, assertNotEquals } from 'std/testing/asserts.ts';
import { Dexonline } from '../mod.ts';

Deno.test('parser', async (test) => {
	await test.step('polysemantic', async () => {
		const entries = await getEntries('da');

		assertEquals(entries, [
			{
				type: 'adverb',
				lemma: 'da',
			},
			{
				type: 'verb',
				lemma: 'da',
			},
			{
				type: 'adverb',
				lemma: 'dar',
			},
			{
				type: 'conjuncție',
				lemma: 'dar',
			},
			{
				type: 'adverb',
				lemma: 'darn',
			},
			{
				type: 'prefix',
				lemma: 'deca',
			},
			{
				type: 'interjecție',
				lemma: 'de / dec / deh',
			},
			{
				type: 'prepoziție',
				lemma: 'de',
			},
		]);
	});

	await test.step('monosemantic', async () => {
		const entries = await getEntries('întregime');

		assertEquals(entries, [
			{
				type: 'substantiv feminin',
				lemma: 'întregime',
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
