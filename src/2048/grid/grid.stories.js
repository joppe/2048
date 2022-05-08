import { Grid } from './grid';

export default {
    title: 'Grid',
    args: {
        columns: 4,
        rows: 4,
    },
};

const Template = ({ rows, columns }) => {
    const grid = new Grid({ rows, columns });

    return grid.render();
};

export const GridStory = Template.bind({});
GridStory.storyName = 'Grid';
