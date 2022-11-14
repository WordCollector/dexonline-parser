/**
 * Taking two arrays, combines them so that opposing elements come in pairs.
 *
 * @param arrays - The arrays to zip.
 * @returns An array of tuples of opposing elements.
 */
function zip<T>(...arrays: Array<Array<T>> & { length: 2 }): Array<[T, T]> {
	// Takes the minimum of the two arrays to prevent out-of-bounds access.
	const length = Math.min(...arrays.map((array) => array.length));

	const result = new Array();
	for (let i = 0; i < length; i++) {
		const tuple = new Array();
		for (const array of arrays) {
			tuple.push(array[i]);
		}
		result.push(tuple);
	}
	return result;
}

/**
 * Casts a value to an enumerator.
 *
 * @param enumerator - The enumerator the value belongs to.
 * @param value - The value to cast.
 * @returns The enumerator value equivalent of the cast value, or undefined if couldn't cast value.
 */
function valueToEnum<
	EnumType extends Record<string, any>,
	EnumValue = EnumType extends Record<string, infer V> ? V : never,
>(enumerator: EnumType, value: EnumValue): EnumValue | undefined {
	return (Object.values(enumerator) as unknown as Array<EnumValue>).includes(value)
		? value as unknown as EnumValue
		: undefined;
}

export { valueToEnum, zip };
