// The initial value of the game score
let scoreCounter = 0;
// The initial value of the player lives
let lives = 3;

// Enemies our player must avoid
var Enemy = function (x, y, s) {

    // Variables to determine x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = s;

    // The image of the enemy 
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;
   // The enemies reappear again from the left side
    if (this.x > 510) {
        this.x = -200;
        };

    // Checks for collisions between the player and the enemies   
    // we add 80 and 50 to player.x and player.y to make boundaries of the player image
    if ((this.x > player.x - 80 && this.x < player.x + 80) &&
        (this.y > player.y - 50 && this.y < player.y + 50)) {
        player.x = 202;
        player.y = 405;        
        lives--;
        document.querySelector ('.lives').innerText = lives;
        player.gameOver();
    }
};




// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class has x and y axis
var Player = function (x, y) {

    this.x = x;
    this.y = y;  

    //The image of the player 
    this.player = 'images/char-horn-girl.png';
};

 
// Method to check if the user win
Player.prototype.win = function() {
    // Variables to display the win game modal
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('replayBtn');
    const span = document.getElementsByClassName('close')[0];
    let score = document.getElementById('score');
    // The win condition
    if (lives > 0 && scoreCounter > 500)
     {
        setTimeout(function() { 
            // Display the modal
            modal.style.display = 'block'; 
            // The modal has button to restart the game and close the modal           
             btn.onclick = function(e) {
                modal.style.display = 'none';
                document.querySelector('.lives').innerText = 3;
                document.querySelector('#score').innerText = 0;
                lives = 3;
                scoreCounter = 0;                                
            }
                // Clicking on X will close the modal 
                span.onclick = function() {
                modal.style.display = 'none';
            }
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }       
            }           
        }, 500)
    } 
}   

// Method to check if the user lost the game
Player.prototype.gameOver= function (){
    // The losing condition
    if ( lives === 0){
        setTimeout(function() { 
            let bt = document.getElementById('win');
            let did = document.getElementById('did-it');
            did.style.display = 'block';

            // Button to replay again and restart the game
            bt.onclick = function(){
                did.style.display = 'none';
                document.querySelector('.lives').innerText = 3;
                document.querySelector('#score').innerText = 0;
                lives = 3;
                scoreCounter = 0;
            }   
        }, 500)
    }
}

// Method to reset the player position if it reached the top and update the score
Player.prototype.update = function () { 
    // If the user reached the top update the score           
    if (this.y <= 0) { 
        scoreCounter ++;             
        setTimeout(() => {
            // And reset the user position  
            this.x = 202;
            this.y = 405; 
            score.innerText = scoreCounter;             
        }, 1000);

        this.win();   
       }
};



// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (directionKeys) {

    switch (directionKeys){
        case 'left':
        if (this.x > 0){
            this.x -= 102
        }
            break;
        case 'right':
        if (this.x < 405){
            this.x += 102;
        }
            break;
        case 'up':
        if (this.y > 0){
            this.y -= 83;
        }
            break;
        case 'down':
        if (this.y < 405){
            this.y += 83;
        }
            break;
    }   
}

// Instantiation of enemy objects
// allEnemies array contains all enemies objects
 let allEnemies = [];
 let initPosition = [65, 147, 230];

 initPosition.forEach((enemyPosition) => {
    let enemy = new Enemy(0, enemyPosition, 100 + Math.floor(Math.random() * 222))
    allEnemies.push(enemy);
});

//Instantiation of player object
// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

