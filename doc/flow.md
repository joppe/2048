# 2048

## Start

The size of the matrix/grid is configurable.
A table is rendered with cells. The number of cells in a row and in a column are equal the size.

A value has a cell property. There is a collection of values. To determine the cells without a value the values collection is used.

## Flow

- Game.cycle, this will create a new value that is placed on an empty cell in the grid
- Game.move, move all cells in a given direction


## Movement

### Move to the right

First iterate over the rows and then the cells of the row.
Start with the second last cell from the right.
Try for each cell to move it as far to the right. A cell can move to the right if the target cell is empty or 
has the same value.

```
direction = {left: 1, top: 0}
outerLoop = [0, 1, 2, 3]
outerProp = 'row'
innerLoop = [2, 1, 0]
innerProp = 'col'
endIndex = 4
increment = 1
```
