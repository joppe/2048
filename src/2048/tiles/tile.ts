import './tiles.css';

import { element } from '../../lib/element/element';
import { isSamePosition } from './position.helper';
import type { Position } from './position.type';
import { State } from './state';

export class Tile {
    private readonly _value: number;
    private _position: Position;
    private _state: State;
    private readonly _element: HTMLElement;

    get position(): Position {
        return this._position;
    }

    get state(): State {
        return this._state;
    }

    set state(state: State) {
        this._state = state;
    }

    get value(): number {
        return this._value;
    }

    public constructor(value: number, position: Position, state: State) {
        this._value = value;
        this._position = position;
        this._state = state;
        this._element = element([
            'div',
            {
                class: `tiles__tile tiles__tile--${String(
                    this._value,
                )} ${this.postionClass(this._position)} ${this.stateClass(
                    this._state,
                )}`,
            },
            [['div', { class: 'tiles__tile__value' }, String(this._value)]],
        ]);
    }

    public render(): HTMLElement {
        return this._element;
    }

    public remove(): void {
        this._element.remove();
    }

    public move(position: Position): boolean {
        this._element.classList.remove(this.stateClass(this._state));

        if (isSamePosition(this._position, position)) {
            return false;
        }

        this._element.classList.remove(this.postionClass(this._position));
        this._element.classList.add(this.postionClass(position));

        this._position = position;

        return true;
    }

    private postionClass(position: Position) {
        return `tiles__tile--pos-${position.row}-${position.column}`;
    }

    private stateClass(state: State) {
        return `tiles__tile--${state}`;
    }
}
