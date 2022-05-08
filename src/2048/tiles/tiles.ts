import './tiles.css';

import { element } from '../../lib/element/element';
import type { Axis } from './axis.type';
import { Direction } from './direction';
import type { MoveResult } from './move-result.type';
import type { Position } from './position.type';
import { State } from './state';
import { Tile } from './tile';
import type { TilesOptions } from './tiles-options.type';

export class Tiles {
    private _tiles: Tile[] = [];
    private readonly _rows: number;
    private readonly _columns: number;
    private readonly _container: HTMLElement;

    public constructor(options: TilesOptions) {
        this._rows = options.rows;
        this._columns = options.columns;
        this._container = element(['div', { class: 'tiles' }]);
    }

    public add(value: number, position: Position, state = State.NEW): Tile {
        const tile = new Tile(value, position, state);

        this._container.appendChild(tile.render());
        this._tiles.push(tile);

        return tile;
    }

    public move(direction: Direction): MoveResult {
        const result = { hasMoved: false, value: 0 };
        const isHorizontal =
            direction === Direction.LEFT || direction === Direction.RIGHT;
        const isIncremenal =
            direction === Direction.RIGHT || direction === Direction.DOWN;
        const offset = isIncremenal ? -1 : 1;
        const max = isHorizontal ? this._rows : this._columns;
        const axis = isHorizontal ? 'row' : 'column';
        const move = isHorizontal ? 'column' : 'row';

        this.cleanup();

        for (let i = 0; i < max; i += 1) {
            let previous: Tile | undefined;
            let moveTo = isIncremenal ? max - 1 : 0;

            this.getTiles(axis, i, isIncremenal).forEach((tile) => {
                if (
                    previous?.state !== State.OBSOLETE &&
                    previous?.value === tile.value
                ) {
                    this.merge(tile, previous);

                    result.hasMoved = true;
                    result.value = tile.value;
                } else {
                    const position = {
                        [axis]: i,
                        [move]: moveTo,
                    } as Position;

                    if (tile.move(position)) {
                        result.hasMoved = true;
                    }

                    moveTo += offset;
                }

                previous = tile;
            });
        }

        return result;
    }

    public positions(): Position[] {
        return this._tiles.map((tile) => {
            return tile.position;
        });
    }

    public render(): HTMLElement {
        const root = element(['div', undefined]);

        root.appendChild(this.styles());
        root.appendChild(this._container);

        return root;
    }

    public reset(): void {
        this._tiles = [];
    }

    private cleanup(): void {
        this._tiles = this._tiles.filter((tile) => {
            if (tile.state === State.OBSOLETE) {
                tile.remove();

                return false;
            }

            return true;
        });
    }

    private merge(tile: Tile, previous: Tile): void {
        tile.move(previous.position);
        tile.state = State.OBSOLETE;
        previous.state = State.OBSOLETE;

        this.add(2 * tile.value, tile.position, State.MERGED);
    }

    private getTiles(axis: Axis, index: number, reverse: boolean): Tile[] {
        const tiles = this._tiles.filter(
            (tile) => tile.position[axis] === index,
        );
        const sortProp = axis === 'column' ? 'row' : 'column';

        tiles.sort((a, b) => {
            if (reverse) {
                return a.position[sortProp] > b.position[sortProp] ? -1 : 1;
            }

            return a.position[sortProp] < b.position[sortProp] ? -1 : 1;
        });

        return tiles;
    }

    private styles(): HTMLElement {
        const size = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--size',
            ),
            10,
        );

        let styles = '';

        for (let row = 0; row < this._rows; row += 1) {
            for (let column = 0; column < this._columns; column += 1) {
                styles += `
                    .tiles__tile--pos-${row}-${column} {
                        transform: translate(${column * size}px, ${
                    row * size
                }px);
                    }
                `;
            }
        }

        return element(['style', undefined, styles.replaceAll('\n', '')]);
    }
}
