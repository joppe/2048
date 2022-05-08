export function map<IterValue, ToValue>(
    iterator: Iterable<IterValue>,
    mapper: (value: IterValue) => ToValue,
): ToValue[] {
    const values = [];

    for (const value of iterator) {
        values.push(mapper(value));
    }

    return values;
}
