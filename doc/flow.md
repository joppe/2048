# 2048

## Start

The size of the matrix/grid is configurable.
A table is rendered with cells. The number of cells in a row and in a column are equal the size.

A value has a position property. There is a collection of values. To determine the cells without a value the values 
collection is used.

## Flow

- Game.cycle, this will create a new value that is placed on an empty cell in the grid
- Game.move, move all cells in a given direction


## Movement

### Move to the right

This is a horizontal movement, where the column value of the position will increment.
 
For this example let's focus on just one row.

Start
```
+-+-+-+-+
|2|2|2|.|
+-+-+-+-+
+-+-+-+-+
|A|B|C|.|
+-+-+-+-+
```

I. 
```
+-+-+-+-+
|2|2|.|2|
+-+-+-+-+
+-+-+-+-+
|A|B|.|C|
+-+-+-+-+
```

II.
```
+-+-+-+-+
|2|.|.|4|
+-+-+-+-+
+-+-+-+-+
|A|.|.|C|
+-+-+-+-+
```

III.
```
+-+-+-+-+
|.|.|2|4|
+-+-+-+-+
+-+-+-+-+
|.|.|A|C|
+-+-+-+-+
```

Cycle

- guard
    - check if is animating (animationCount > 0), if true stop otherwise proceed
- direction (from state model)
    - if direction is defined, goto move
- appear
    - get random empty cell
    - create new value

Move

- check can move, if false stop
- move
    - set animationCount
    - trigger animation

Listen:animationFinished

- decrement animationCount


