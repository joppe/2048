export function forEach<IterValue>(
    iterator: Iterable<IterValue>,
    callback: (value: IterValue) => void,
): void {
    for (const value of iterator) {
        callback(value);
    }
}
