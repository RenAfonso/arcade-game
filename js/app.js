let seconds = 0;

let countSeconds = setInterval(() => {
    seconds += 1;

    if (seconds >= 10) {
        timer.innerHTML = seconds;
    } else {
        timer.innerHTML = '0' + seconds;
    }
}, 1000);

// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x < 505) {
            this.x += (100*dt);
        } else {
            this.x = -100;
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 400;
    }

    update() {
    //TODO: add collisions with enemies!
        if (player.y < 20) {
            this.x = 202;
            this.y = 400;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyboard) {
        if (keyboard == 'up' && this.y > 9) {
            this.y -= 5;
        } else if (keyboard == 'down' && this.y < 400) {
            this.y += 5;
        } else if (keyboard == 'right' && this.x < 415) {
            this.x += 5;
        } else if (keyboard == 'left' && this.x > -9) {
            this.x -= 5;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let bug1 = new Enemy(-101, 140);
let bug2 = new Enemy(-220, 140);

let allEnemies = [bug1, bug2];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
