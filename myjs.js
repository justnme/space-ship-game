document.addEventListener('DOMContentLoaded', (event) => {
    var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
});

function startGame() {
    var timerDiv = document.getElementById('timer');
    var gameOverDiv = document.getElementById('gameOver');
    
    startButton.disabled = true;
    var timeLeft = 60;

    var timerId = setInterval(function() {
        if(timeLeft > 0 )
            timeLeft--;
            timerDiv.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameOverDiv.style.display = 'block';
            if (score1 > score2) {
                gameOverDiv.textContent = "Game over! Player One wins!";
            } else if (score2 > score1) {
                gameOverDiv.textContent = "Game over! Player Two wins!";
            } else {
                gameOverDiv.textContent = "Game over! It's a tie!";
            }
        }
    }, 1000);

    var ship1 = document.getElementById('ship1');
    var ship2 = document.getElementById('ship2');
    var game = document.getElementById('game'); 
    var speed = 3.75; 
    var keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, a: false, s: false, d: false };


    
    function moveShip1() {
        var x = ship1.offsetLeft;
        var y = ship1.offsetTop;
    
        ship1.classList.add('rotate');
    
        if (keys.ArrowUp && y > game.offsetTop) {
            ship1.style.top = (y - speed) + 'px';
            ship1.style.transform = 'rotate(0deg)';
        } else if (keys.ArrowDown && y < (game.offsetTop + game.offsetHeight - ship1.offsetHeight)) {
            ship1.style.top = (y + speed) + 'px';
            ship1.style.transform = 'rotate(180deg)';
        } else if (keys.ArrowLeft && x > game.offsetLeft) {
            ship1.style.left = (x - speed) + 'px';
            ship1.style.transform = 'rotate(-90deg)';
        } else if (keys.ArrowRight && x < (game.offsetLeft + game.offsetWidth - ship1.offsetWidth)) { 
            ship1.style.left = (x + speed) + 'px';
            ship1.style.transform = 'rotate(90deg)';

        } else {
            ship1.style.transform = 'rotate(0deg)';
        }
    
        requestAnimationFrame(moveShip1);
    }
    
    function moveShip2() {
        var x = ship2.offsetLeft;
        var y = ship2.offsetTop;

      
        if (keys.w && y > game.offsetTop) {
            ship2.style.top = (y - speed) + 'px';
            ship2.style.transform = 'rotate(0deg)';
        } else if (keys.s && y < (game.offsetTop + game.offsetHeight - ship2.offsetHeight)) {
            ship2.style.top = (y + speed) + 'px';
            ship2.style.transform = 'rotate(180deg)';
        } else if (keys.a && x > game.offsetLeft) {
            ship2.style.left = (x - speed) + 'px';
            ship2.style.transform = 'rotate(-90deg)';
        } else if (keys.d && x < (game.offsetLeft + game.offsetWidth - ship2.offsetWidth)) { 
            ship2.style.left = (x + speed) + 'px';
            ship2.style.transform = 'rotate(90deg)';

        } else {
            ship2.style.transform = 'rotate(0deg)';
        }

        requestAnimationFrame(moveShip2);
    }

    window.addEventListener('keydown', function(event) {
        if (event.key in keys) keys[event.key] = true;
    });

    window.addEventListener('keyup', function(event) {
        if (event.key in keys) keys[event.key] = false;
    });

    function spawnImage() {
        var img = document.createElement('img');
        img.src = 'asteroid.png';
        img.style.position = 'absolute';

        var size = Math.random() * (100 - 25) + 25; 
        img.style.width = size + 'px';
        img.style.height = size + 'px';

        var x = Math.random() * (game.offsetWidth - size); 
        var y = Math.random() * (game.offsetHeight - size);
        img.style.left = x + 'px';
        img.style.top = y + 'px';

        var rotation = Math.random() * 360; 
        img.style.transform = 'rotate(' + rotation + 'deg)';

        game.appendChild(img);
    }

    var timerId = setInterval(spawnImage, 1000); 

    setTimeout(function() {
        clearInterval(timerId); 
    }, 60000);

    var score1 = 0;
    var score2 = 0;

    function checkCollision(ship, asteroid) {
        var rect1 = ship.getBoundingClientRect();
        var rect2 = asteroid.getBoundingClientRect();

        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    function updateGame() {
        var asteroids = game.getElementsByTagName('img');
        for (var i = 0; i < asteroids.length; i++) {
            if (asteroids[i] && checkCollision(ship1, asteroids[i])) {
                game.removeChild(asteroids[i]);
                score1++;
                console.log("Score of Player 1: " + score1);
                document.getElementById('player1Got').textContent = "Player One Collected: " + score1;
            }
            if (asteroids[i] && checkCollision(ship2, asteroids[i])) {
                game.removeChild(asteroids[i]);
                score2++;
                console.log("Score of Player 2: " + score2);
                document.getElementById('player2Got').textContent = "Player Two Collected: " + score2;
            }
        }
        requestAnimationFrame(updateGame);
    }

    updateGame();
    moveShip1();
    moveShip2();
}
