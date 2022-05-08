import type { Position } from './position.type';

export function isSamePosition(a: Position, b: Position): boolean {
    return a.column === b.column && a.row === b.row;
}
