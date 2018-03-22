let seconds;
let countSeconds;
let speedX = 0;
let speedY = 0;
let score = 0;
let lives = 1;
let extraLifeCounter = 0;
let gemsCaught = [];
let currentGem = [];
let pocketGem = 0;

const boy = document.getElementById('boy');
const menu = document.getElementById('start-menu');
const count = document.getElementById('count');
const gem = document.getElementById('gem');
const lifecount = document.getElementById('lifecount');
const modal = document.getElementById('end-modal');
const message = document.getElementById('display-message');
const close = document.getElementById('close');
const again = document.getElementById('again');
const logo = document.getElementById('logo');
const thanks = document.getElementById('thank-you');

function start() {
    select.play();
    menu.style.display = 'none';

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

    seconds = 0;

    countSeconds = setInterval(countTime, 1000);
}

function countTime() {
    seconds += 1;

    if (seconds >= 10) {
        timer.innerHTML = seconds;
    } else {
        timer.innerHTML = '0' + seconds;
    }
}

function end() {
    clearInterval(countSeconds);
    openModal();
}

function increaseCount() {
    score += 1;
    count.innerHTML = score;
}

function clearArrays() {
    currentGem.length = 0;
    gemsCaught.length = 0;
}

function increaseLives() {
    if (lives === 0) {
        lives = 1;
    } else if (lives === 1) {
        lives = 2;
    }
    extraLifeCounter = 1;
    lifecount.innerHTML = lives;
}

function openModal() {
    const displayScore = document.getElementById('display-score');
    const displaySeconds = document.getElementById('display-seconds');

    displayScore.innerHTML = score;
    displaySeconds.innerHTML = seconds;
    modal.style.display = 'block';

    close.addEventListener('click', closeModal);
    again.addEventListener('click', playAgain);
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    thanks.style.display = 'block';
}

function playAgain() {
    modal.style.display = 'none';
    thanks.style.display = 'none';
    restart();
}

function checkEndGame() {
    if (lives < 0) {
        logo.innerHTML = '<img src="images/ladybug.svg">';
        message.innerHTML = 'Death by bug!';
        end();
    } else if (score >= 10) {
        logo.innerHTML = '<img src="images/trophy.svg">';
        message.innerHTML = 'Congratulations!';
        end();
    }
}

function restart() {
    clearInterval(countSeconds);
    timer.innerHTML = '00'
    resetVariables();
    lifecount.innerHTML = lives;
    count.innerHTML = score;
    start();
}

function resetVariables() {
    seconds = 0;
    speedX = 0;
    speedY = 0;
    score = 0;
    lives = 1;
    extraLifeCounter = 0;
    gemsCaught = [];
    currentGem = [];
}

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug-small.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        let bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 84 && player.y - this.y < 61;
        let bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 58 && player.y - this.y < 61;
        let topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 84 && this.y - player.y < 72;
        let topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 58 && this.y - player.y < 72;

        if (this.x < 505) {
            this.x += (this.speed*dt);
        } else {
            this.x = -100;
        }

        if (bottomRight || bottomLeft || topRight || topLeft) {
            lives -= 1;
            loseLife.play();
            player.startPosition();
            lifecount.innerHTML = lives;
            pocketGem = 0;
            gem.innerHTML = pocketGem;
            checkEndGame();
        }

        checkEndGame();
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
        if (this.y < 80) {
            goal.play();
            this.startPosition();
            score += pocketGem;
            pocketGem = 0;
            gem.innerHTML = pocketGem;
            increaseCount();
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

class Gem {
    constructor() {
        this.type = 'bonus';
    }

    startPosition() {
        this.x = 505;
        this.y = 606;
    }

    hidePosition() {
        delete this.x;
        delete this.y;
    }

    update() {
        let bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 90 && player.y - this.y < 66;
        let bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 68 && player.y - this.y < 66;
        let topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 90 && this.y - player.y < 72;
        let topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 68 && this.y - player.y < 72;

        if (bottomRight || bottomLeft || topRight || topLeft) {
            let instantGem = currentGem.pop();
            gemsCaught.push(instantGem);
            gemSound.play();
            pocketGem += 1;
            gem.innerHTML = pocketGem;
        }

        if (gemsCaught.length === 3) {
            pocketGem += 2;
            gem.innerHTML = pocketGem;
            clearArrays();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Blue extends Gem {
    constructor() {
        super();
        this.sprite = 'images/gem-blue-small.png';
    }

    startPosition() {
        super.startPosition();
        this.x = 430;
        this.y = 140;
    }

    update() {
        super.update();
        if (score > 0 && gemsCaught.length == 0) {
            if (currentGem[0] !== 'blue'){
                currentGem.push('blue');
                this.startPosition();
            }
        } else {
            this.hidePosition();
        }
    }
}

class Green extends Gem {
    constructor() {
        super();
        this.sprite = 'images/gem-green-small.png';
        this.id = 'green';
    }

    startPosition() {
        super.startPosition();
        this.x = 25;
        this.y = 226;
    }

    update() {
        super.update();
        if (score > 1 && gemsCaught.length == 1) {
            if (currentGem[0] !== 'green'){
                currentGem.push('green');
                this.startPosition();
            }
        } else {
            this.hidePosition();
        }
    }
}

class Orange extends Gem {
    constructor() {
        super();
        this.sprite = 'images/gem-orange-small.png';
        this.id = 'orange';
    }

    startPosition() {
        super.startPosition();
        this.x = 430;
        this.y = 310;
    }

    update() {
        super.update();
        if (score > 2 && gemsCaught.length == 2) {
            if (currentGem[0] !== 'orange'){
                currentGem.push('orange');
                this.startPosition();
            }
        } else {
            this.hidePosition();
        }
    }
}

class Life {
    constructor() {
        this.type = 'bonus';
        this.sprite = 'images/heart-small.png';
    }

    startPosition() {
        this.x = 220;
        this.y = 222;
    }

    hidePosition() {
        delete this.x;
        delete this.y;
    }

    update() {
        let bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 88 && player.y - this.y < 66;
        let bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 68 && player.y - this.y < 66;
        let topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 88 && this.y - player.y < 88;
        let topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 68 && this.y - player.y < 88;

        if (seconds > 30 && extraLifeCounter === 0) {
            this.startPosition();
        } else {
            this.hidePosition();
        }

        if (bottomRight || bottomLeft || topRight || topLeft) {
            extraLife.play();
            increaseLives();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let bug1 = new Enemy(-101, 305, 150);
let bug2 = new Enemy(-220, 305, 150);
let bug3 = new Enemy(-101, 220, 100);
let bug4 = new Enemy(-220, 220, 100);
let bug5 = new Enemy(-341, 135, 200);
let bug6 = new Enemy(-101, 135, 200);
let allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];

let player = new Player();

let gemBlue = new Blue();
let gemGreen = new Green();
let gemOrange = new Orange();
let life = new Life();

let gemSound = new Audio('sounds/diamond2.wav');
let extraLife = new Audio('sounds/extralife.wav');
let loseLife = new Audio('sounds/loselife.wav');
let select = new Audio('sounds/select.wav');
let goal = new Audio('sounds/water.wav');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

boy.addEventListener('click', start);
