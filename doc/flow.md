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

The available values must be grouped by row. When moving to the right, the first value that must be moved is the one at 
the right. Because of this all the values in a row must be ordered by column descending.
The idea is that we want to merge two values, so there is variable `mergeCandidate`, this will be the most right value 
that is already moved.
Iterate over the values in the columns.

I.
The first value must be moved.
The `mergeCandidate` is `undefined`. Because of this the new position must be the most right position. The moved value 
becomes the `mergeCandidate`.

II.
The second value must be moved.
Check if the value is mergable (*) with the `mergeCandidate`. The value get's a new position (the position of the 
`mergeCandidate`) and a property that it will `dissolve`. The `mergeCandidate` get's a new value (the square of the value
) and a property that it is `updated`.
 
III.
The third value must be moved.
Check if the value is mergable (*) with the `mergeCandidate`. The value becomes the new `mergeCandidate` and get's the 
position next to the old `mergeCandidate` (column - 1).

* mergable
Check if the value is already updated, if so return false.
Check if the values are the same, if so return true.
Return false

Use a `stage` mechanism to set the values of an object (Value) but do not set them with `set` so the `change` events wont't be triggered.
Use `commit` to set the staged values.