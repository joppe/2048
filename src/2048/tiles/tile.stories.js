import { container } from '../container/container';
import { Grid } from '../grid/grid';
import { Tiles } from './tiles';

export default {
    title: 'Tile',
    argTypes: {
        column: {
            control: {
                type: 'range',
                min: 0,
                max: 3,
                step: 1,
            },
        },
    },
    args: {
        column: 2,
    },
};

const Template = (() => {
    const rows = 1;
    const columns = 4;
    const grid = new Grid({ rows, columns });
    const tiles = new Tiles({ rows, columns });
    const tile = tiles.add(4, {
        row: 0,
        column: 0,
    });
    const el = container(grid, tiles);

    return ({ column }) => {
        tile.move({ row: 0, column });

        return el;
    };
})();

export const TilesStory = Template.bind({});
TilesStory.storyName = 'Tile';
