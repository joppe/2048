import './container.css';

import { element } from '../../lib/element/element';
import { Grid } from '../grid/grid';
import { Tiles } from '../tiles/tiles';

export function container(grid: Grid, tiles: Tiles): HTMLElement {
    const el = element(['div', { class: 'container' }]);

    el.appendChild(grid.render());
    el.appendChild(tiles.render());

    return el;
}
