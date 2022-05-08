import { container } from '../container/container';
import { Grid } from '../grid/grid';
import { Direction } from './direction';
import { Tiles } from './tiles';

export default {
    title: 'Tiles',
};

export const TilesStory = ({ row, column, value }) => {
    const rows = 4;
    const columns = 4;
    const grid = new Grid({ rows, columns });
    const tiles = new Tiles({ rows, columns });

    tiles.add(value, {
        row,
        column,
    });

    return container(grid, tiles);
};
TilesStory.storyName = 'Tiles';
TilesStory.argTypes = {
    column: {
        control: {
            type: 'range',
            min: 0,
            max: 3,
            step: 1,
        },
    },
    row: {
        control: {
            type: 'range',
            min: 0,
            max: 3,
            step: 1,
        },
    },
    value: {
        control: 'select',
        options: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1048, 2048, 4096],
    },
};
TilesStory.args = {
    column: 2,
    row: 1,
    value: 2,
};

export const MoveStory = (() => {
    const rows = 4;
    const columns = 4;
    const grid = new Grid({ rows, columns });
    const tiles = new Tiles({ rows, columns });

    tiles.add(2, {
        row: 0,
        column: 0,
    });
    tiles.add(4, {
        row: 1,
        column: 0,
    });
    tiles.add(8, {
        row: 2,
        column: 0,
    });

    const el = container(grid, tiles);

    return ({ direction }) => {
        switch (direction) {
            case 'up':
                tiles.move(Direction.UP);
                break;
            case 'down':
                tiles.move(Direction.DOWN);
                break;
            case 'right':
                tiles.move(Direction.RIGHT);
                break;
            case 'left':
                tiles.move(Direction.LEFT);
                break;
        }

        return el;
    };
})();
MoveStory.storyName = 'Move';
MoveStory.argTypes = {
    direction: {
        control: 'select',
        options: ['up', 'down', 'right', 'left'],
    },
};

export const MergeStory = (() => {
    const rows = 4;
    const columns = 4;
    const grid = new Grid({ rows, columns });
    const tiles = new Tiles({ rows, columns });

    tiles.add(2, {
        row: 0,
        column: 0,
    });
    tiles.add(2, {
        row: 0,
        column: 2,
    });

    const el = container(grid, tiles);

    return ({ direction }) => {
        switch (direction) {
            case 'up':
                tiles.move(Direction.UP);
                break;
            case 'down':
                tiles.move(Direction.DOWN);
                break;
            case 'right':
                tiles.move(Direction.RIGHT);
                break;
            case 'left':
                tiles.move(Direction.LEFT);
                break;
        }

        return el;
    };
})();
MergeStory.storyName = 'Merge';
MergeStory.argTypes = {
    direction: {
        control: 'select',
        options: ['up', 'down', 'right', 'left'],
    },
};
