import { Game } from './game';

export default {
    title: 'Game',
};

export const GameStory = () => {
    const game = new Game({ rows: 4, columns: 4 });

    return game.render();
};
GameStory.storyName = 'Game';
