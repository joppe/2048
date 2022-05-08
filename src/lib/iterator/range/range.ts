export function range(start: number, end: number, step = 1): Iterable<number> {
    let index = 0;

    if (step === 0 || start > end) {
        throw new Error(
            `Range configuration error (start: ${start}, end: ${end}, step: ${step})`,
        );
    }

    return {
        [Symbol.iterator]() {
            return {
                next(): IteratorResult<number> {
                    const value = start + index * step;

                    if (value > end) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }

                    index += 1;

                    return {
                        done: false,
                        value,
                    };
                },
            };
        },
    };
}
