export function filter<IterValue>(
    iterator: Iterable<IterValue>,
    callback: (value: IterValue) => boolean,
): IterValue[] {
    const values = [];

    for (const value of iterator) {
        if (callback(value)) {
            values.push(value);
        }
    }

    return values;
}
