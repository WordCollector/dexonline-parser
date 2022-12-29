import { Dexonline } from './mod.ts';

const result = (await Dexonline.get('casă'))!;

console.debug(result.inflection);
