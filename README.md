# GameOfLife
> A cellular automaton devised by the mathematician John Horton Conway in 1970.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Libraries and Frameworks Used](#libraries-and-frameworks-used)
* [Info](#info)


## General Information
The game is played on a 2D square grid and it's a 0-player game, meaning that the evolution of the game is only determined by its initial state. Each cell on the grid can be either dead or alive and according to some rules, the state of a cell changes throughout the evolution.

The rules are as follow:
- If the cell is alive, then it stays alive if it has either 2 or 3 alive neighbors. Otherwise it dies.
- If the cell is dead, then it becomes alive only if it has exactly 3 alive neighbors. Otherwise its state doesn't change.
Neighbors of a cell are the cells that touch it either horizontally, vertically or diagonally. 

In this sample game, the user is given the possibility to set the state of a cell at the beginning of the game and in the middle of it.


## Technologies Used
- HTML5
- CSS3
- Javascript ES6


## Libraries and Frameworks Used
- OnsenUI
- JQuery


## Info
Created using the [Monaca](https://monaca.io/) platform.
