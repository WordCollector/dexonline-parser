import { build, emptyDir } from 'https://deno.land/x/dnt@0.31.0/mod.ts';

if (!Deno.args[0]) {
	throw new Error('Missing version string (first argument).');
}

const outputDirectory = './npm';
const importsFile = './imports.json';

await emptyDir(outputDirectory);

await build({
	entryPoints: ['./mod.ts'],
	outDir: outputDirectory,
	shims: {
		deno: true,
		undici: true,
	},
	importMap: importsFile,
	package: {
		name: 'dexonline-parser',
		version: Deno.args[0]!,
		description: 'A lightweight Dexonline.ro parser to fetch information about words in the Romanian language.',
		keywords: [
			'javascript',
			'typescript',
			'parser',
			'scraper',
			'dexonline',
			'romanian',
			'definitions',
			'words',
			'language',
			'dictionary',
		],
		homepage: 'https://github.com/linguition/dexonline-parser',
		bugs: {
			url: 'https://github.com/linguition/dexonline-parser/issues',
			email: 'contact@wordcollector.co.uk',
		},
		license: 'MIT',
		contributors: [{
			author: `Dorian 'vxern' Oszczęda <vxern@wordcollector.co.uk> (https://github.com/vxern)`,
		}],
		main: 'mod.ts',
		repository: {
			type: 'git',
			url: 'https://github.com/linguition/dexonline-parser',
		},
	},
	scriptModule: false,
	compilerOptions: { lib: ['dom', 'es2022', 'es2021', 'es2020', 'es2019', 'es2018', 'es2017', 'es2016', 'es2015'] },
});

Deno.copyFile('LICENSE', `${outputDirectory}/LICENSE`);
Deno.copyFile('README.md', `${outputDirectory}/README.md`);
