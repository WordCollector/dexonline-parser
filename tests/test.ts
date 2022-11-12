import { Dexonline } from '../mod.ts';

Deno.test('parser', async () => {
	const entries = await Dexonline.get('încă');
	console.debug(entries);
});
