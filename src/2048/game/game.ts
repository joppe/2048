import './game.css';

import { element } from '../../lib/element/element';
import { control } from '../control/control';
import { Grid } from '../grid/grid';
import { Score } from '../score/score';
import { Direction } from '../tiles/direction';
import { Position } from '../tiles/position.type';
import { Tiles } from '../tiles/tiles';
import { GameOptions } from './game-options.type';

export class Game {
    private readonly _grid: Grid;
    private readonly _tiles: Tiles;
    private readonly _score: Score;
    private isBusy = true;

    public constructor(options: GameOptions) {
        this._grid = new Grid({ rows: options.rows, columns: options.columns });
        this._tiles = new Tiles({
            rows: options.rows,
            columns: options.columns,
        });
        this._score = new Score();
    }

    public render(): HTMLElement {
        const el = element(['div', { class: 'game' }]);
        const container = element(['div', { class: 'container' }]);

        container.appendChild(this._grid.render());
        container.appendChild(this._tiles.render());

        el.appendChild(this._score.render());
        el.appendChild(container);

        control(this.move.bind(this));

        this.start();

        return el;
    }

    private start(): void {
        this._tiles.reset();
        this._score.reset();

        this.add(2);
    }

    private move(direction: Direction): void {
        if (this.isBusy) {
            return;
        }

        const result = this._tiles.move(direction);

        if (result.hasMoved) {
            this._score.add(result.value);
            this.add();
        }
    }

    private add(amount = 1): boolean {
        const positions = this.positions();

        if (positions.length < amount) {
            return false;
        }

        this.isBusy = false;

        for (let i = 0; i < amount; i += 1) {
            const index = Math.floor(positions.length * Math.random());
            const value = Math.random() > 0.7 ? 4 : 2;

            this._tiles.add(value, positions[index]);
        }

        return true;
    }

    private positions(): Position[] {
        const tiles = this._tiles.positions();

        return this._grid.positions.filter((cell) => {
            return (
                tiles.find((tile) => {
                    return tile.column === cell.column && tile.row === cell.row;
                }) === undefined
            );
        });
    }
}
