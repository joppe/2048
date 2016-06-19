/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="ValuePositionInterface.ts" />

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
     * Return an array of all positions that have a value.
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
     * @param {object} valuePosition
     * @returns {Value}
     */
    getValueByPosition(valuePosition:ValuePositionInterface):Value {
        let value:Value;

        value = this.find((value:Value):boolean => {
            let position:Position = value.get('position');

            return undefined !== position && valuePosition.row === position.get('row') && valuePosition.column === position.get('column');
        });

        return value;
    }

    getAsGrid(innerProp, outerProp) {
        let grid:{[prop:string]:any} = {};

        this.each((value:Value) => {
            let innerValue:string = String(value.get('position').get(innerProp)),
                outerValue:string = String(value.get('position').get(outerProp));

            if (undefined === grid[innerValue]) {
                // grid[innerValue]:[id:string]:string = {};
            }

            // grid[innerValue][outerValue] = value;
        });

        return grid;
    }
}
