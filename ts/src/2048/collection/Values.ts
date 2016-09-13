import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {Position} from './../model/Position';
import {GridValuesInterface} from './../interface/GridValuesInterface';
import {GridPositionInterface} from './../interface/GridPositionInterface';

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
    getValueByPosition(valuePosition:GridPositionInterface):Value {
        let value:Value;

        value = this.find((value:Value):boolean => {
            let position:Position = value.get('position');

            return undefined !== position && valuePosition.row === position.get('row') && valuePosition.column === position.get('column');
        });

        return value;
    }

    /**
     * @param {string} groupProperty
     * @param {string} orderProperty
     * @param {boolean} reverse
     * @returns {GridValuesInterface}
     */
    getAsGrid(groupProperty:string, orderProperty:string, reverse:boolean):GridValuesInterface {
        let grid:GridValuesInterface = {};

        // Group the values
        this.each((value:Value) => {
            let index:string = String(value.get('position').get(groupProperty));

            if (undefined === grid[index]) {
                grid[index] = <Value[]>[];
            }

            grid[index].push(value);
        });

        // Sort the values
        for (let index of Object.keys(grid)) {
            grid[index].sort((a:Value, b:Value) => {
                if (reverse) {
                    return b.get('position').get(orderProperty) - a.get('position').get(orderProperty);
                } else {
                    return a.get('position').get(orderProperty) - b.get('position').get(orderProperty);
                }
            });
        }

        return grid;
    }
}
