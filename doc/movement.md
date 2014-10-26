# Movement

## Move to the right

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
