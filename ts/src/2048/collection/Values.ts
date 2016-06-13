/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />

import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {Position} from './../model/Position';

/**
 * @class Values
 */
export class Values extends Backbone.Collection<Value> {
    /**
     * @type {Value}
     */
    get model():{new():Value;} {
        return Value;
    }

    /**
     * Return an array of all positions that have a value
     * 
     * @return Position[]
     */
    getPositions():Position[] {
        let positions:Position[] = [];

        this.each((value:Value) => {
            positions.push(value.get('position'));
        });

        return positions;
    }

    /**
     * @param {number} row
     * @param {number} col
     * @returns {Value}
     */
    getValueByPosition(row:number, col:number):Value {
        let value:Value;

        value = this.find((value:Value):boolean => {
            let position:Position = value.get('position');

            return undefined !== position && row === position.get('row') && col === position.get('col');
        });

        return value;
    }
}
