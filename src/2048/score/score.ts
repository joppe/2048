import './score.css';

import { element } from '../../lib/element/element';

export class Score {
    private readonly _element: HTMLElement;
    private _score = 0;
    private _addition: HTMLElement | undefined;

    public constructor() {
        this._element = element([
            'div',
            { class: 'score' },
            String(this._score),
        ]);
    }

    public render(): HTMLElement {
        return this._element;
    }

    public reset(): void {
        this._score = 0;
    }

    public add(value: number): void {
        if (this._addition) {
            this._addition.remove();
        }

        if (value === 0) {
            return;
        }

        const toAdd = 2 * value;

        this._addition = element([
            'div',
            { class: 'score__addition' },
            `+ ${toAdd}`,
        ]);

        this._score += toAdd;
        this._element.innerText = String(this._score);
        this._element.appendChild(this._addition);
    }
}
