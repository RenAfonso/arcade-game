# Arcade Game

### Description

This is a project made for Udacity's front end nanodegree.

## Table of Contents

* [Gameplay](#instructions)
* [Build](#build)
* [TODO](#TODO)
* [Contributing](#contributing)

## Gameplay

Please, download or clone this repository and run `index.html` locally.

On load, you'll encounter a modal box with basic game instructions and a character to select. If you click on the character, the modal will hide and the gameplay starts.

Once the game runs you'll encounter two main areas: the score panel and the game canvas, in this order.

#### Score panel
    
The score logs how many points you made so far, by reaching the water.

The gems in pocket lets you know how many gems you've caught before reaching the water.

The lives left counter indicates just that.

The timer counts the game time.


#### Deck

Your goal in this game is to reach a score of at least 10. To get there you must reach the water, granting you 1 point and sending you back to the starting point for another run.

If a bug touches you, you'll lose a life. When the lives left drops below zero, the game ends.

You can score extra points by catching the gems that pop up. However, you need to catch them and reach the water without losing a life, otherwise you'll lose the points you had stored in your pocket.

There's also an extra life available wich is represented by a heart symbol. It appears only once at the 30 second mark.

## Build

This web app was built using HTML5, CSS3 and JavaScript - `engine.js` and `resources.js` were provided by Udacity.

- Card symbols from [Font Awesome](https://fontawesome.com/)
- Font from Google Fonts (Coda)
- Background from [wallpaperbrowse](https://wallpaperbrowse.com/)

## TODO

- Changing the `app.js` file so that more player characters can be added to the game, allowing the user to select different characters to play with.
- Leaderboard that will register top 5 scores while the web app is open.

## Contributing

Please check out [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests are accepted.
