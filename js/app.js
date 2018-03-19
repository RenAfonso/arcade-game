let seconds = 0;
let speedX = 0;
let speedY = 0;
let score = 0;
let lives = 3;

const count = document.getElementById('count');
const lifecount = document.getElementById('lifecount');

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
        this.sprite = 'images/enemy-bug-small.png';
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

        if ((player.x >= this.x && player.y >= this.y && player.x - this.x < 90 && player.y - this.y < 66) ||
        (player.x < this.x && player.y >= this.y && this.x - player.x < 68 && player.y - this.y < 66) ||
        (player.x >= this.x && player.y < this.y && player.x - this.x < 90 && this.y - player.y < 72) ||
        (player.x < this.x && player.y < this.y && this.x - player.x < 68 && this.y - player.y < 72)) {
            lives -= 1;
            lifecount.innerHTML = lives;
            player.startPosition();
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
        this.sprite = 'images/char-boy-small.png';
        this.startPosition();
    }

    startPosition() {
        this.x = 220;
        this.y = 450;
    }

    update(dt) {
        if (this.y < 100) {
            this.startPosition();
            score += 1;
            count.innerHTML = score;
            if (score % 30 === 0) {
                lives += 1;
                lifecount.innerHTML = lives;
            }
        }

        if (this.y < 9 && speedY < 0) {
            this.x = this.x + (speedX*dt);
            this.y = 8;
        } else if (this.y > 455 && speedY > 0) {
            this.x = this.x + (speedX*dt);
            this.y = 456;
        } else if (this.x < 1 && speedX < 0) {
            this.x = 0;
            this.y = this.y + (speedY*dt);
        } else if (this.x > 437 && speedX > 0) {
            this.x = 438;
            this.y = this.y + (speedY*dt);
        } else {
        this.x = this.x + (speedX*dt);
        this.y = this.y + (speedY*dt);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleKeydown(keyboard) {
        if (keyboard == 'up') {
            speedY = -150;
        } else if (keyboard == 'down') {
            speedY = 150;
        } else if (keyboard == 'right') {
            speedX = 150;
        } else if (keyboard == 'left') {
            speedX = -150;
        }
    }

    handleKeyup(keyoff) {
        if (keyoff == 'up' && speedY === -150) {
            speedY = 0;
        } else if (keyoff == 'down' && speedY === 150) {
            speedY = 0;
        } else if (keyoff == 'right' && speedX === 150) {
            speedX = 0;
        } else if (keyoff == 'left' && speedX === -150) {
            speedX = 0;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let bug1 = new Enemy(-101, 250);
let bug2 = new Enemy(-220, 250);

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

    player.handleKeydown(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleKeyup(allowedKeys[e.keyCode]);
});
