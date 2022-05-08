import './grid.css';

import { element } from '../../lib/element/element';
import type { ElementConfig } from '../../lib/element/element-config.type';
import { map } from '../../lib/iterator/map/map';
import { range } from '../../lib/iterator/range/range';
import type { Position } from '../tiles/position.type';
import type { GridOptions } from './grid-options.type';

export class Grid {
    private readonly _rows: number;
    private readonly _columns: number;
    private readonly _positions: Position[];

    get positions(): Position[] {
        return this._positions;
    }

    public constructor(options: GridOptions) {
        this._rows = options.rows;
        this._columns = options.columns;
        this._positions = map(
            range(0, this._rows * this._columns - 1),
            (index) => ({
                row: Math.floor(index / this._columns),
                column: index % this._columns,
            }),
        );
    }

    public render(): HTMLElement {
        const size = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--size',
            ),
            10,
        );
        const cells: ElementConfig[] = map(
            range(1, this._rows * this._columns),
            () => ['div', { class: 'grid__cell' }],
        );

        return element([
            'div',
            {
                class: 'grid',
                style: `width: ${this._columns * size}px; height: ${
                    this._rows * size
                }px;`,
            },
            cells,
        ]);
    }
}
