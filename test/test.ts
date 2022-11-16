import { assertEquals, assertNotEquals } from 'std/testing/asserts.ts';
import { Dexonline, DictionaryFlags, MatchingModes } from '../mod.ts';
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
					table: [
						[
							'adverb (I8) Surse flexiune: DOR',
							'da',
						],
					],
				},
				{
					tags: ['verb', 'grupa I', 'conjugarea I'],
					index: 1,
					lemma: 'da',
					table: [
						[
							'verb (VT93) Surse flexiune: DOR',
							'verb (VT93) Surse flexiune: DOR',
							'infinitiv',
							'infinitiv lung',
							'participiu',
							'gerunziu',
							'imperativ pers. a II-a',
							'imperativ pers. a II-a',
						],
						[
							'verb (VT93) Surse flexiune: DOR',
							'verb (VT93) Surse flexiune: DOR',
							'(a) da',
							'dare',
							'dat datu‑',
							'dând dându‑',
							'singular',
							'plural',
						],
						[
							'verb (VT93) Surse flexiune: DOR',
							'verb (VT93) Surse flexiune: DOR',
							'(a) da',
							'dare',
							'dat datu‑',
							'dând dându‑',
							'dă',
							'dați',
						],
						[
							'',
							'',
							'',
							'',
							'',
							'',
							'',
							'',
						],
						[
							'numărul',
							'persoana',
							'prezent',
							'conjunctiv prezent',
							'imperfect',
							'perfect simplu',
							'mai mult ca perfect',
							'mai mult ca perfect',
						],
						[
							'singular',
							'I (eu)',
							'dau',
							'(să) dau',
							'dădeam dam dedeam',
							'dădui dedei detei',
							'dădusem dasem dedesem detesem',
							'dădusem dasem dedesem detesem',
						],
						[
							'singular',
							'a II-a (tu)',
							'dai',
							'(să) dai',
							'dădeai dai dedeai',
							'dăduși dedeși deteși',
							'dăduseși daseși dedeseși deteseși',
							'dăduseși daseși dedeseși deteseși',
						],
						[
							'singular',
							'a III-a (el, ea)',
							'dă',
							'(să) dea deie',
							'dădea da dedea',
							'dădu dede dete',
							'dăduse dase dedese detese',
							'dăduse dase dedese detese',
						],
						[
							'plural',
							'I (noi)',
							'dăm',
							'(să) dăm',
							'dădeam dam dedeam',
							'dădurăm dederăm deterăm',
							'dăduserăm dădusem daserăm dasem dedeserăm dedesem deteserăm detesem',
							'dăduserăm dădusem daserăm dasem dedeserăm dedesem deteserăm detesem',
						],
						[
							'plural',
							'a II-a (voi)',
							'dați',
							'(să) dați',
							'dădeați dați dedeați',
							'dădurăți dederăți deterăți',
							'dăduserăți dăduseți daserăți daseți dedeserăți dedeseți deteserăți deteseți',
							'dăduserăți dăduseți daserăți daseți dedeserăți dedeseți deteserăți deteseți',
						],
						[
							'plural',
							'a III-a (ei, ele)',
							'dau',
							'(să) dea deie',
							'dădeau dau dedeau',
							'dădură dederă deteră',
							'dăduseră daseră dedeseră deteseră',
							'dăduseră daseră dedeseră deteseră',
						],
					],
				},
				{
					tags: ['adverb'],
					index: 1,
					lemma: 'dar',
					table: [
						[
							'adverb (I8) Surse flexiune: DOR',
							'dar da‑',
						],
					],
				},
				{
					tags: ['conjuncție'],
					index: 2,
					lemma: 'dar',
					table: [
						[
							'conjuncție (I11) Surse flexiune: DOR',
							'dar da‑',
						],
					],
				},
				{
					tags: ['adverb'],
					index: 0,
					lemma: 'darn',
					table: [
						[
							'adverb (I8)',
							'darn',
						],
					],
				},
				{
					tags: ['prepoziție'],
					index: 2,
					lemma: 'de',
					table: [
						[
							'prepoziție (I12)',
							'de d‑',
						],
					],
				},
				{
					tags: ['interjecție'],
					index: 0,
					lemma: 'de',
					table: [
						[
							'interjecție (I10) Surse flexiune: DOR',
							'de',
						],
					],
				},
				{
					tags: ['prefix'],
					index: 0,
					lemma: 'deca',
					table: [
						[
							'afix (I7)',
							'deca',
						],
					],
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
				table: [
					[
						'substantiv feminin (F107) Surse flexiune: DOR',
						'substantiv feminin (F107) Surse flexiune: DOR',
						'nearticulat',
						'articulat',
					],
					[
						'nominativ-acuzativ',
						'singular',
						'întregime ‑ntregime',
						'întregimea ‑ntregimea',
					],
					[
						'nominativ-acuzativ',
						'plural',
						'întregimi ‑ntregimi',
						'întregimile ‑ntregimile',
					],
					[
						'genitiv-dativ',
						'singular',
						'întregimi ‑ntregimi',
						'întregimii ‑ntregimii',
					],
					[
						'genitiv-dativ',
						'plural',
						'întregimi ‑ntregimi',
						'întregimilor ‑ntregimilor',
					],
					[
						'vocativ',
						'singular',
						'—',
						'—',
					],
					[
						'vocativ',
						'plural',
						'—',
						'—',
					],
				],
			});
		});
	});

	await test.step('configuration', async (test) => {
		await test.step('parser mode', async () => {
			const response = await fetch(Links.definition('a'));
			if (!response.ok) {
				await response.body?.cancel();
			}

			assertEquals(response.ok, true);

			const body = await response.text();

			const entriesLax = Dexonline.parse(body, { mode: MatchingModes.Lax });
			const entriesStrict = Dexonline.parse(body, { mode: MatchingModes.Strict, word: 'a' });

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

		await test.step('flags', async (test) => {
			const testCedilla = async () => {
				const resultsOrUndefined = await Dexonline.get('și', { flags: DictionaryFlags.UseCedillas });
				assertNotEquals(resultsOrUndefined, undefined);

				const results = resultsOrUndefined!;
				const resultsStringified = JSON.stringify(results);

				assertNotEquals(resultsStringified.includes('ș') || resultsStringified.includes('Ș'), true);
				assertNotEquals(resultsStringified.includes('ț') || resultsStringified.includes('Ț'), true);
			};

			const testMatchDiacritics = async () => {
				const resultsOrUndefined = await Dexonline.get('ca', { flags: DictionaryFlags.MatchDiacritics });
				assertNotEquals(resultsOrUndefined, undefined);

				const results = resultsOrUndefined!;

				assertNotEquals(results.synthesis.some((entry) => entry.lemma === 'că'), true);
			};

			const testUsePreReformOrtography = async () => {
				const resultsOrUndefined = await Dexonline.get('și', { flags: DictionaryFlags.UsePreReformOrthography });
				assertNotEquals(resultsOrUndefined, undefined);

				const results = resultsOrUndefined!;
				const resultsStringified = JSON.stringify(results);

				assertNotEquals(resultsStringified.includes('â') || resultsStringified.includes('Â'), true);
			};

			const testSearchOnlyNormativeDictionaries = async () => {
				const resultsOrUndefined = await Dexonline.get('bengos', {
					flags: DictionaryFlags.SearchOnlyNormativeDictionaries,
				});
				assertNotEquals(resultsOrUndefined, undefined);

				const results = resultsOrUndefined!;

				assertEquals(results.synthesis.length, 0);
			};

			await test.step('cedilla', testCedilla);
			await test.step('match diacritics', testMatchDiacritics);
			await test.step('use pre-reform orthography', testUsePreReformOrtography);
			await test.step('search only normative dictionaries', testSearchOnlyNormativeDictionaries);
		});
	});
});
