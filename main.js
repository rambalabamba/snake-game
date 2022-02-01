const startBtn = document.getElementById('start');
const score = document.getElementById('score');
const grid = document.querySelector('.grid');

const mainBtn = document.getElementById('main-button');
const overlay = document.getElementById('overlay');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const expertBtn = document.getElementById('expert-btn');

const gameOverText = document.getElementById('game-over');

let squares = [];
let currentSnake = [2, 1, 0];

let scoreNmbr = 0;

let width = 10;
let direction = 1;

let appleIndex = 0;

let timerID = 0;
let speed = 1000;
let intervalTime = 0.9;

easyBtn.addEventListener('click', function() {
    speed = 1000;
    startGame()
});

mediumBtn.addEventListener('click', function() {
    speed = 750;
    startGame()
});

expertBtn.addEventListener('click', function() {
    speed = 500;
    startGame()
});

document.addEventListener('keydown', control);

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.classList .add('square');
        grid.appendChild(square);
        squares.push(square);        
    }
};

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function move() {

    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] % width === 9 && direction === 1) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        gameOverText.style.display = 'block';
        return clearInterval(timerID);
    }

    // snake moving pattern
    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop();

    //remove styling from last element
    squares[tail].classList.remove('snake');

    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);

    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake');
    
    // currentSnake[0] === appleIndex ;
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple

        squares[currentSnake[0]].classList.remove('apple');
        // squares[appleIndex].classList.remove('apple'); 

        //grow our snake array

        currentSnake.push(tail);
        // currentSnake.unshift(currentSnake[0] + direction);

        //grow our snake by adding class of snake to it

        squares[tail].classList.add('snake');
        // squares[currentSnake[0]].classList.add('snake');

        console.log(currentSnake);

        //generate new apple
        generateApples();
        //add one to the score
        scoreNmbr++;
        //display our score
        score.textContent = scoreNmbr;
        //speed up our snake
        clearInterval(timerID);
        speed = speed * intervalTime;
        timerID = setInterval(move, speed);

    }     
    
};

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple');
};



function control(e) {
    if (e.keyCode === 38) {
        console.log('We are going UP!!');
        direction = - width;
    } else if (e.keyCode === 40) {
        console.log('We are going DOWN!!');
        direction = + width;
    } else if (e.keyCode === 39) {
        console.log('We are going RIGHT!!');
        direction = 1;
    } else if (e.keyCode === 37) {
        console.log('We are going LEFT!!');
        direction = - 1;
    }
};

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerID);
    currentSnake = [2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    scoreNmbr = 0;
    direction = 1;
    generateApples();

    score.textContent = scoreNmbr; 
    gameOverText.style.display = 'none';   

    timerID = setInterval(move, speed);
}
