// Enemies our player must avoid

let canvasHeight = 75;
let canvasWidth = 100;
let winCount = 0;
var numWins = document.querySelector('#num-wins');


var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 101;
    this.movementOffset = (Math.random() * 500) + 100;
    this.canvasCol = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.movementOffset * dt;
    if (this.x >= canvasWidth * 5) {
        this.x = -canvasWidth;
    }
    this.canvasCol = Math.floor((this.x + 150) / canvasWidth);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player =  (x, y) => {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.canvasCol = 3;
}

Player.prototype.update = function () {
    // since button clicks are already checked for
    // we will only check for collisions here(with other enemies)
    // since the array is already in the scope
    // console.log(player.canvasCol);
    allEnemies.forEach(enemy => {
        // console.log(enemy.x);
        if (enemy.y == this.y && enemy.canvasCol == this.canvasCol) {
            winCount = 0;
            numWins.innerHTML = winCount;
            this.x = canvasWidth * 2;
            this.y = canvasHeight * 5;
            this.canvasCol = 3;
        }
    });

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (pressedKey) {
    //handle controls using if-else statements
    if (pressedKey == 'left') {
        if (this.x >= canvasHeight) {
            this.x -= canvasWidth;
            this.canvasCol--;
        }
    } else if (pressedKey == 'right') {
        if (this.x <= canvasHeight * 5) {
            this.x += canvasWidth;
            this.canvasCol++;
        }
    } else if (pressedKey == 'up') {
        //move player one block up 
        this.y -= canvasHeight;
        // check if the player won
        if (this.y < canvasHeight) {
            winCount++;
            numWins.innerHTML = winCount;
            this.y = canvasHeight * 5
        }
    } else { //down
        if (this.y < canvasHeight * 5) {
            this.y += canvasHeight;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(-20, canvasHeight, 10),
    new Enemy(150, canvasHeight, 10),
    new Enemy(canvasHeight, canvasHeight * 2, 10),
    new Enemy(58, canvasHeight * 3, 10),
]

// Place the player object in a variable called player
var player = new Player(canvasWidth * 2, canvasHeight * 5);
numWins.innerHTML = winCount;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});