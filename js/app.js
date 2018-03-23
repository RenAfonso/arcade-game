'use strict';

// Variables used during the game
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

// Constants from HTML
const BOY = document.getElementById('boy');
const MENU = document.getElementById('start-menu');
const COUNT = document.getElementById('count');
const GEM = document.getElementById('gem');
const LIFECOUNT = document.getElementById('lifecount');
const MODAL = document.getElementById('end-modal');
const MESSAGE = document.getElementById('display-message');
const CLOSE = document.getElementById('close');
const AGAIN = document.getElementById('again');
const LOGO = document.getElementById('logo');
const THANKS = document.getElementById('thank-you');

// Function to start the game upon character selection. Hides menu and adds keyboard event listeners. Starts counting seconds.
function start() {
    select.play();
    MENU.style.display = 'none';

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

// Function that displays time on screen
function countTime() {
    seconds += 1;

    if (seconds >= 10) {
        timer.innerHTML = seconds;
    } else {
        timer.innerHTML = '0' + seconds;
    }
}

// Function that ends the game and clears counted seconds
function end() {
    clearInterval(countSeconds);
    openModal();
}

// Function that increases score
function increaseCount() {
    score += 1;
    COUNT.innerHTML = score;
}

// Function that resets the arrays that store arrays. One that dictates which gem appears and the other that allows you to "keep them" in your pocket
function clearArrays() {
    currentGem.length = 0;
    gemsCaught.length = 0;
}

// Function that increases lives upon catching a heart. It only happens once per game due to extraLifeCounter
function increaseLives() {
    if (lives === 0) {
        lives = 1;
    } else if (lives === 1) {
        lives = 2;
    }
    extraLifeCounter = 1;
    LIFECOUNT.innerHTML = lives;
}

// Function for game over modal (either win or loss)
function openModal() {
    const displayScore = document.getElementById('display-score');
    const displaySeconds = document.getElementById('display-seconds');

    displayScore.innerHTML = score;
    displaySeconds.innerHTML = seconds;
    MODAL.style.display = 'block';

    CLOSE.addEventListener('click', closeModal);
    AGAIN.addEventListener('click', playAgain);
}

// Function to close the modal
function closeModal() {
    THANKS.style.display = 'block';
}

// Function that restarts the game if player chooses so on the modal before
function playAgain() {
    MODAL.style.display = 'none';
    THANKS.style.display = 'none';
    restart();
}

// Function that tests for victory or defeat condition, adjusting end game modal accordingly
function checkEndGame() {
    if (lives < 0) {
        LOGO.innerHTML = '<img src="images/ladybug.svg" alt="a ladybug logo">';
        MESSAGE.innerHTML = 'Death by bug!';
        end();
    } else if (score >= 10) {
        LOGO.innerHTML = '<img src="images/trophy.svg" alt="a trophy logo">';
        MESSAGE.innerHTML = 'Congratulations!';
        end();
    }
}

// Function that restarts the game, setting it to the original status
function restart() {
    clearInterval(countSeconds);
    timer.innerHTML = '00';
    resetVariables();
    LIFECOUNT.innerHTML = lives;
    COUNT.innerHTML = score;
    start();
}

// Function that resets all variables, essential for restart function
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

// Enemy object (bugs!) that requires position and speed inputs, upon object creation
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug-small.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
        
        // Player-enemy(this) contact specification
        const bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 84 && player.y - this.y < 61;
        const bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 58 && player.y - this.y < 61;
        const topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 84 && this.y - player.y < 72;
        const topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 58 && this.y - player.y < 72;

        // Forces enemy movement to the right, depending on specified speed
        if (this.x < 505) {
            this.x += (this.speed*dt);
        } else {
            this.x = -100;
        }

        // If a bug touches the player, he loses a life, loses gems in pocket and checks for end game position
        if (bottomRight || bottomLeft || topRight || topLeft) {
            lives -= 1;
            loseLife.play();
            player.startPosition();
            LIFECOUNT.innerHTML = lives;
            pocketGem = 0;
            GEM.innerHTML = pocketGem;
            checkEndGame();
        }

        // At all times, checks for endgame condition due to score increase. Can be placed in player.update(dt) but it makes an easier read here
        checkEndGame();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player object
class Player {
    constructor() {
        this.sprite = 'images/char-boy-small.png';
        this.startPosition();
    }

    // Where he starts
    startPosition() {
        this.x = 220;
        this.y = 450;
    }

    update(dt) {
        // Checks if player reaches the water and, if so, adjusts score and gems in pocket
        if (this.y < 80) {
            goal.play();
            this.startPosition();
            score += pocketGem;
            pocketGem = 0;
            GEM.innerHTML = pocketGem;
            increaseCount();
        }

        // Keeps player from moving out of the canvas
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

    // Handles keyboard interaction and adds horizontal and vertical speed
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

    // Sets player speed to 0 on keyup
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

// Bonus object that allows extra score
class Gem {
    constructor() {
        this.type = 'bonus';
    }

    // They're off screen unless called for
    startPosition() {
        this.x = 505;
        this.y = 606;
    }

    // Hides the gem when this method is called
    hidePosition() {
        delete this.x;
        delete this.y;
    }

    update() {

        // Player-gem(this) contact specification
        const bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 90 && player.y - this.y < 66;
        const bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 68 && player.y - this.y < 66;
        const topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 90 && this.y - player.y < 72;
        const topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 68 && this.y - player.y < 72;

        // If a player catches a gem, it stores said gem in the pocket
        if (bottomRight || bottomLeft || topRight || topLeft) {
            let instantGem = currentGem.pop();
            gemsCaught.push(instantGem);
            gemSound.play();
            pocketGem += 1;
            gem.innerHTML = pocketGem;
        }

        // The orange gem is worth more...
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

// A subclass for a blue gem...
class Blue extends Gem {
    constructor() {
        super();
        this.sprite = 'images/gem-blue-small.png';
    }

    //that always appears here!
    startPosition() {
        super.startPosition();
        this.x = 430;
        this.y = 140;
    }

    update() {
        // Because the gem appearance order is fixed, it checks if it's the blue gem turn
        super.update();
        if (score > 0 && gemsCaught.length === 0) {
            if (currentGem[0] !== 'blue'){
                currentGem.push('blue');
                this.startPosition();
            }
        } else {
            this.hidePosition();
        }
    }
}

// Just like the blue gem
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

// Just like the blue gem
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

// A heart object that grants an extra life
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

        // Player-heart(this) contact specification
        const bottomRight = player.x >= this.x && player.y >= this.y && player.x - this.x < 88 && player.y - this.y < 66;
        const bottomLeft = player.x < this.x && player.y >= this.y && this.x - player.x < 68 && player.y - this.y < 66;
        const topRight = player.x >= this.x && player.y < this.y && player.x - this.x < 88 && this.y - player.y < 88;
        const topLeft = player.x < this.x && player.y < this.y && this.x - player.x < 68 && this.y - player.y < 88;

        // Condition to display the heart. It only happens once per game.
        if (seconds > 30 && extraLifeCounter === 0) {
            this.startPosition();
        } else {
            this.hidePosition();
        }

        // Checks for collision and increases life counter
        if (bottomRight || bottomLeft || topRight || topLeft) {
            extraLife.play();
            increaseLives();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Creates all enemy objects and stores them in an array for game engine
let bug1 = new Enemy(-101, 305, 150);
let bug2 = new Enemy(-220, 305, 150);
let bug3 = new Enemy(-101, 220, 100);
let bug4 = new Enemy(-220, 220, 100);
let bug5 = new Enemy(-341, 135, 200);
let bug6 = new Enemy(-101, 135, 200);
let allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
// Creates the player object
let player = new Player();
// Creates the bonus objects
let gemBlue = new Blue();
let gemGreen = new Green();
let gemOrange = new Orange();
let life = new Life();
// Creates the sounds that happen on game events
let gemSound = new Audio('sounds/diamond2.wav');
let extraLife = new Audio('sounds/extralife.wav');
let loseLife = new Audio('sounds/loselife.wav');
let select = new Audio('sounds/select.wav');
let goal = new Audio('sounds/water.wav');

// Adds event listener to first selection menu, starting the game upon character selection
BOY.addEventListener('click', start);
