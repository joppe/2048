/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../../../../typings/globals/underscore/index.d.ts" />
/// <reference path="GridOptionsInterface.ts" />

import Backbone from 'backbone';
import _ from 'underscore';
import {Position} from './../model/Position';

/**
 * @class Grid
 */
export class Grid extends Backbone.Collection<Position> {
    /**
     * @type {Position}
     */
    get model():{new():Position;} {
        return Position;
    }

    /**
     * @param {Position[]} models
     * @param {object} options
     */
    constructor(models:Object[], options:GridOptionsInterface) {
        super(models, options);

        this.createPositions(options.size);
    }

    /**
     * @param {number} size
     */
    private createPositions(size:number):void {
        _.each(_.range(0, size), (row) => {
            _.each(_.range(0, size), (col) => {
                this.add({
                    row,
                    col
                });
            });
        });
    }

    /**
     * @param {Position[]} excludePositions
     * @returns {Position}
     */
    getRandomPosition(excludePositions:Position[] = []):Position {
        let position:Position,
            availablePositions = this.getPositions(excludePositions);
        
        if (0 < availablePositions.length) {
            let index = _.random(availablePositions.length - 1);

            position = availablePositions[index];
        }

        return position;
    }

    /**
     * @param {Position[]} excludePositions
     * @returns {Position[]}
     */
    getPositions(excludePositions:Position[] = []):Position[] {
        let positions:Position[];

        positions = this.filter((position) => {
            return false === _.contains(excludePositions, position);
        });

        return positions;
    }

    /**
     * @param {number} row
     * @returns {Position[]}
     */
    getRow(row:number):Position[] {
        return this.filter((position) => {
            return position.get('row') === row;
        });
    }

    /**
     * @param {number} col
     * @returns {Position[]}
     */
    getColumn(col:number):Position[] {
        return this.filter((position) => {
            return position.get('col') === col;
        });
    }

    /**
     * @param {number} row
     * @param {number} col
     * @returns {Position}
     */
    getPosition(row:number, col:number):Position {
        return this.findWhere({
            row,
            col
        });
    }

    /*/
    getNextPosition(position:Position, axis:string, index:number) {
        var props = {
                row: position.get('row'),
                col: position.get('col')
            };

        props[axis] = index;

        return this.getPosition(props.row, props.col);
    }
    /**/
}
