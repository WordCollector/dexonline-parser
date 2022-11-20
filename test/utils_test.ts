import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';
import { zip } from '../src/mod.ts';

Deno.test('zip', () => {
	assertEquals(zip(['a'], ['b']), [['a', 'b']]);
	assertEquals(zip(['a'], ['b', 'c']), [['a', 'b']]);
	assertEquals(zip(['a', 'b'], ['c', 'd']), [['a', 'c'], ['b', 'd']]);
});
