import * as Backbone from 'backbone';
import * as _ from 'underscore';
import {Position} from './../model/Position';
import {GridOptionsInterface} from './../interface/GridOptionsInterface';
import {GridPositionInterface} from './../interface/GridPositionInterface';

/**
 * @class Grid
 */
export class Grid extends Backbone.Collection<Position> {
    /**
     * @type {Position}
     */
    get model():{new():Position} {
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
            _.each(_.range(0, size), (column) => {
                this.add({
                    row,
                    column
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
     * @param {object} position
     * @returns {Position}
     */
    getPosition(position:GridPositionInterface):Position {
        window.console.log('getPosition', position);
        return this.findWhere(position);
    }
}
