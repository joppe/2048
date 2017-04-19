import * as Backbone from 'backbone';
import {Cell} from './Cell';
import {ValueAttributesInterface} from './ValueAttributesInterface';

const INITIAL_VALUE_DEVIATION:number = 0.8;
const MAX_INITIAL_VALUE:number = 4;
const MIN_INITIAL_VALUE:number = 2;

/**
 * TODO: change move to moveTo, create a getter/setter hasMoved
 * TODO: change merge to mergeWith, create a getter/setter isMerged
 *
 * @class Value
 */
export class Value extends Backbone.Model {
    /**
     * @returns {boolean}
     */
    get animating():boolean {
        return true === this.get('animating');
    }

    /**
     * @param {boolean} animating
     */
    set animating(animating:boolean) {
        this.set('animating', animating);
    }

    /**
     * @returns {Cell|undefined}
     */
    get move():Cell|undefined {
        return this.get('move');
    }

    /**
     * @param {Cell|undefined} cell
     */
    set move(cell:Cell|undefined) {
        this.set('move', cell);
    }

    /**
     * @returns {number}
     */
    get value():number {
        return this.get('value');
    }

    /**
     * @returns {boolean}
     */
    get initialized():boolean {
        return true === this.get('initialized');
    }

    /**
     * @param {boolean} initialized
     */
    set initialized(initialized:boolean) {
        this.set('initialized', initialized);
    }

    /**
     * @returns {Cell}
     */
    get cell():Cell {
        return this.get('cell');
    }

    /**
     * @param {Cell} cell
     */
    set cell(cell:Cell) {
        this.set('cell', cell);
    }

    /**
     * @returns {Value|undefined}
     */
    get merge():Value|undefined {
        return this.get('merge');
    }

    /**
     * @param {Value|undefined} value
     */
    set merge(value:Value|undefined) {
        this.set('merge', value);
    }

    /**
     * The target is the cell that belongs to the value after it is done animating.
     *
     * @returns {Cell}
     */
    get target():Cell {
        const target:Cell|undefined = this.move;

        if (undefined !== target) {
            return target;
        }

        return this.cell;
    }

    /**
     * Set the attribute "value" randomly.
     *
     * @param {ValueAttributesInterface} attributes
     */
    constructor(attributes:ValueAttributesInterface) {
        super(attributes);

        if (undefined === attributes.value) {
            this.set('value', Value.generateValue());
        }
    }

    /**
     * Create a random value.
     *
     * @returns {number}
     */
    static generateValue():number {
        return Math.random() > INITIAL_VALUE_DEVIATION ? MAX_INITIAL_VALUE : MIN_INITIAL_VALUE;
    }

    /**
     * @param {Value|undefined} value
     * @returns {boolean}
     */
    isMergeable(value:Value|undefined):boolean {
        // TODO: if the value is already merged then it can not merge again
        return undefined !== value && value.value === this.value;
    }

    /**
     * Double the value.
     */
    double():void {
        this.set('value', this.value * 2);
    }
}
