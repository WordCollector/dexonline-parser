import { assertEquals, assertNotEquals } from 'std/testing/asserts.ts';
import { Dexonline, SearchModes } from '../mod.ts';
import { Links } from '../src/mod.ts';

Deno.test('parser', async (test) => {
	await test.step('inexistent term', async () => {
		const resultsOrUndefined = await Dexonline.get('dexonline');
		assertEquals(resultsOrUndefined, undefined);
	});

	await test.step('term without synthesis', async () => {
		const resultsOrUndefined = await Dexonline.get('ade');
		assertNotEquals(resultsOrUndefined, undefined);

		const results = resultsOrUndefined!;
		assertEquals(results.synthesis.length, 0);
		assertEquals(results.inflection.length, 1);
	});

	await test.step('polysemantic', async (test) => {
		const resultsOrUndefined = await Dexonline.get('da');
		assertNotEquals(resultsOrUndefined, undefined);

		const results = resultsOrUndefined!;

		await test.step('synthesis', () => {
			assertEquals(results.synthesis.length, 8);

			const first = results.synthesis.shift()!;

			assertEquals(first, {
				type: 'adverb',
				lemma: 'da',
				examples: [],
				definitions: [
					{
						tags: [],
						sources: [`DEX '09`, 'MDA2', `DEX '98`, 'DLRLC'],
						value:
							'Cuvânt care se folosește pentru a răspunde afirmativ la o întrebare sau pentru a exprima o afirmație, un consimțământ.',
						examples: [{
							tags: [],
							sources: ['DLRLC'],
							value: 'Toți sunt aici? – Da.',
						}, {
							tags: [],
							sources: ['DLRLC'],
							value: 'Mai mult Passa vorbea. Domițian se mulțumea să zică da sau nu. BASSARABESCU, V. 18.',
						}, {
							tags: [],
							sources: ['DLRLC'],
							value: 'Ai înțeles ce ți-am spus? – Da, mămucă. CREANGĂ, P. 6.',
						}],
						definitions: [{
							tags: [],
							sources: ['MDA2'],
							value:
								'(În dialog; adesea cu repetarea propoziției sau a unei părți din propoziție) Exprimă o afirmație întărită.',
							examples: [{
								tags: [],
								sources: ['MDA2'],
								value: 'Așa este? – Da, așa este.',
							}],
							definitions: [],
							expressions: [],
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
							examples: [],
							definitions: [],
							expressions: [],
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
							examples: [],
							definitions: [],
							expressions: [{
								tags: [],
								sources: ['NODEX'],
								value: 'Vodă da, iar Hâncu ba = îi spui una, iar el îți răspunde alta.',
								examples: [],
								expressions: [],
								relations: {
									synonyms: [],
									antonyms: [],
									diminutives: [],
									augmentatives: [],
								},
							}, {
								tags: [],
								sources: ['MDA2'],
								value: 'Așa da = exprimă aprobarea, acordul în legătură cu modul de desfășurare a unei acțiuni.',
								examples: [],
								expressions: [],
								relations: {
									synonyms: [],
									antonyms: [],
									diminutives: [],
									augmentatives: [],
								},
							}],
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
							examples: [{
								tags: [],
								sources: ['NODEX'],
								value: 'Da ori ba?',
							}],
							definitions: [],
							expressions: [],
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
							examples: [{
								tags: [],
								sources: ['NODEX'],
								value: 'Da, era să uit.',
							}],
							definitions: [],
							expressions: [],
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
							examples: [],
							definitions: [],
							expressions: [],
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
							examples: [],
							definitions: [{
								tags: ['prin extensiune'],
								sources: ['MDA2'],
								value: 'Afirmație.',
								examples: [],
								definitions: [],
								expressions: [],
								relations: {
									synonyms: ['afirmație'],
									antonyms: [],
									diminutives: [],
									augmentatives: [],
								},
							}],
							expressions: [],
							relations: {
								synonyms: [],
								antonyms: [],
								diminutives: [],
								augmentatives: [],
							},
						}],
						expressions: [{
							tags: ['locuțiune adverbială'],
							sources: [`DEX '09`, 'MDA2', `DEX '98`, 'DLRLC'],
							value: 'Ba da, exprimă răspunsul afirmativ la o întrebare negativă.',
							examples: [{
								sources: ['DLRLC'],
								tags: [],
								value: 'N-ai terminat? – Ba da.',
							}],
							expressions: [],
							relations: {
								synonyms: [],
								antonyms: [],
								diminutives: [],
								augmentatives: [],
							},
						}, {
							tags: [],
							sources: ['MDA2'],
							value: 'A zice (sau a spune) da = a face o afirmație.',
							examples: [],
							expressions: [{
								sources: ['MDA2'],
								tags: [],
								value: 'Aproba.',
								examples: [],
								expressions: [],
								relations: {
									synonyms: ['aproba'],
									antonyms: [],
									diminutives: [],
									augmentatives: [],
								},
							}, {
								sources: ['MDA2'],
								tags: ['prin extensiune'],
								value: 'Confirma.',
								examples: [],
								expressions: [],
								relations: {
									synonyms: ['confirma'],
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
				expressions: [],
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

			const entriesShallow = results.synthesis.map((entry) => ({
				...entry,
				expressions: [],
				examples: [],
				definitions: [],
			}));

			assertEquals(entriesShallow, [
				{
					type: 'verb',
					lemma: 'da',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['limba latină'],
						sources: [`DEX '09`, `DEX '98`, 'NODEX'],
						value: 'dare',
					}],
				},
				{
					type: 'adverb',
					lemma: 'dar',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['necunoscută'],
						sources: [`DEX '09`, `DEX '98`],
						value: '',
					}],
				},
				{
					type: 'conjuncție',
					lemma: 'dar',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['necunoscută'],
						sources: [`DEX '09`, `DEX '98`],
						value: '',
					}],
				},
				{
					type: 'adverb',
					lemma: 'darn',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['limba italiană'],
						sources: [`DEX '09`, `DEX '98`, 'DN'],
						value: 'indarnó',
					}],
				},
				{
					type: 'prefix',
					lemma: 'deca',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['limba neogreacă'],
						sources: [`DEX '09`, `DEX '98`, 'DN'],
						value: 'déka',
					}],
				},
				{
					type: 'interjecție',
					lemma: 'de / dec / deh',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['onomatopee'],
						sources: [`DEX '09`, 'NODEX'],
						value: '',
					}],
				},
				{
					type: 'prepoziție',
					lemma: 'de',
					examples: [],
					definitions: [],
					expressions: [],
					etymology: [{
						tags: ['limba latină'],
						sources: [`DEX '09`],
						value: 'de',
					}],
				},
			]);
		});

		await test.step('inflection', () => {
			assertEquals(results.inflection.length, 8);

			assertEquals(results.inflection, [
				{
					tags: ['adverb'],
					index: 0,
					lemma: 'da',
				},
				{
					tags: ['verb', 'grupa I', 'conjugarea I'],
					index: 1,
					lemma: 'da',
				},
				{
					tags: ['adverb'],
					index: 1,
					lemma: 'dar',
				},
				{
					tags: ['conjuncție'],
					index: 2,
					lemma: 'dar',
				},
				{
					tags: ['adverb'],
					index: 0,
					lemma: 'darn',
				},
				{
					tags: ['prepoziție'],
					index: 2,
					lemma: 'de',
				},
				{
					tags: ['interjecție'],
					index: 0,
					lemma: 'de',
				},
				{
					tags: ['prefix'],
					index: 0,
					lemma: 'deca',
				},
			]);
		});
	});

	await test.step('monosemantic', async (test) => {
		const resultsOrUndefined = await Dexonline.get('întregime');
		assertNotEquals(resultsOrUndefined, undefined);

		const results = resultsOrUndefined!;

		await test.step('synthesis', () => {
			assertEquals(results.synthesis.length, 1);

			const first = results.synthesis.shift()!;

			assertEquals(first, {
				type: 'substantiv feminin',
				lemma: 'întregime',
				examples: [],
				definitions: [{
					tags: [],
					sources: [`DEX '09`, `DEX '98`, 'DLRLC'],
					value: 'Calitatea de a fi întreg.',
					examples: [{
						tags: [],
						value: 'Să nu mai puteți coprinde cu gîndul întregimea scopului ce-mi propun. ODOBESCU, S. II 234.',
						sources: ['DLRLC'],
					}],
					definitions: [{
						tags: ['concretizat'],
						sources: [`DEX '09`, `DEX '98`, 'DLRLC'],
						value: 'Ansamblul elementelor care constituie un tot.',
						examples: [{
							tags: [],
							value: 'Un copaci bătrîn căzuse... se așternuse Cu-ntregimea-i la pămînt. PANN, P. V. II 53.',
							sources: ['DLRLC'],
						}],
						definitions: [],
						expressions: [],
						relations: {
							synonyms: [],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}],
					expressions: [{
						tags: ['locuțiune adverbială'],
						sources: [`DEX '09`, `DEX '98`, 'DLRLC'],
						value: 'În întregime = de tot.',
						examples: [{
							tags: [],
							sources: ['DLRLC'],
							value: 'Cartea a fost tradusă în întregime.',
						}, {
							tags: [],
							sources: ['DLRLC'],
							value: 'Îl cercetă... din tălpi pînă-n creștet, în întregime, de la distanță. C. PETRESCU, A. R. 15.',
						}],
						expressions: [],
						relations: {
							synonyms: ['complet'],
							antonyms: [],
							diminutives: [],
							augmentatives: [],
						},
					}, {
						tags: [],
						sources: ['DLRLC'],
						value: 'Mai întregimea... = mai tot, aproape tot.',
						examples: [{
							tags: [],
							sources: ['DLRLC'],
							value: 'Să-i vadă cineva despărțiți de mai întregimea emigrației. GHICA, A. 726.',
						}],
						expressions: [],
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
				expressions: [],
				etymology: [{
					tags: [],
					sources: [`DEX '09`, `DEX '98`],
					value: 'Întreg + sufix -ime.',
				}],
			});
		});

		await test.step('inflection', () => {
			assertEquals(results.inflection.length, 1);

			const first = results.inflection.shift()!;

			assertEquals(first, {
				tags: ['substantiv feminin'],
				index: 0,
				lemma: 'întregime',
			});
		});
	});

	await test.step('configuration', async (test) => {
		await test.step('strict/lax mode', async () => {
			const response = await fetch(Links.definition('a'));
			if (!response.ok) {
				await response.body?.cancel();
			}

			assertEquals(response.ok, true);

			const body = await response.text();

			const entriesLax = Dexonline.parse(body, { mode: SearchModes.Lax });
			const entriesStrict = Dexonline.parse(body, { mode: SearchModes.Strict, word: 'a' });

			assertEquals(
				entriesLax.synthesis.every((entry) => entry.lemma === 'a') &&
					entriesLax.inflection.every((entry) => entry.lemma === 'a'),
				false,
			);
			assertEquals(
				entriesStrict.synthesis.every((entry) => entry.lemma === 'a') &&
					entriesStrict.inflection.every((entry) => entry.lemma === 'a'),
				true,
			);
		});
	});
});
