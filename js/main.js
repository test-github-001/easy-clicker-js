'use strict';

// GAME SETTINGS
const GAME_NAME = 'КлИкЕр!';
const GAME_TIME = 30;
const MAX_PLACES_ON_SCREEN = 100;
const TARGET_AWAIT_START_TIME = 1;
const TARGET_AWAIT_RANGE = 0.75;

let bestResult = 0;

// GEN HTML TAGS
const divTarget = document.getElementById('click-target');
      divTarget.onclick = getTargetClick;
const divGetScores = document.getElementById('get-scores');
const divGetScoresSpan = divGetScores.querySelector('span');

const divInfo = document.getElementById('info');

const divGameInfo = document.getElementById('game-info');
const pointsSpan = document.getElementById('points').querySelector('span');
const timeSpan = document.getElementById('timer').querySelector('span');
const bestSpan = document.getElementById('best-result').querySelector('span');

const divMenuInfo = document.getElementById('menu-info');
      divMenuInfo.onclick = startGame;
const titleMenuSpan = divMenuInfo.querySelector('h1').querySelector('span');
const descriptionMenuSpan = divMenuInfo.querySelector('p').querySelector('span');
const bestScoreMenuSpan = divMenuInfo.querySelector('h2').querySelector('span');

// SET START INFO TO HTML
titleMenuSpan.innerHTML = GAME_NAME;
descriptionMenuSpan.innerHTML = GAME_TIME;
bestScoreMenuSpan.innerHTML = bestResult;

// GAME LOGIC CODE
let scores = 0;
let gameTime = GAME_TIME;
let timeoutTime = TARGET_AWAIT_START_TIME * 1000;
let gameInterval;

pointsSpan.innerHTML = scores;
timeSpan.innerHTML = gameTime;
bestSpan.innerHTML = bestResult;

function getTargetClick() {

    divTarget.style.left = getRandomPointX() + 'px';
    divTarget.style.top = getRandomPointY() + 'px';

    divGetScoresSpan.innerHTML = 1;
    divGetScores.classList.remove('show');
    setTimeout( () => divGetScores.classList.add('show'), 0);

    scores += 1;
    pointsSpan.innerHTML = scores;

    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        divTarget.style.left = getRandomPointX() + 'px';
        divTarget.style.top = getRandomPointY() + 'px';
    }, timeoutTime * TARGET_AWAIT_RANGE);
}

// count target offsets and sides
const sidePaddings = 20; // CSS padding size
const gameInfoHeight =  Math.ceil(divGameInfo.clientHeight) + sidePaddings * 2;
const gameWidth = innerWidth - sidePaddings * 2;
const gameHeight = innerHeight - sidePaddings - gameInfoHeight;
const gameSquare = gameWidth * gameHeight; console.log(gameWidth, 'x', gameHeight, '=', gameSquare);
const targetSide = Math.floor( Math.sqrt(gameSquare / MAX_PLACES_ON_SCREEN) ); console.log(targetSide);
const sidesInWidth = Math.floor(gameWidth / targetSide);
const sidesInHeight = Math.floor(gameHeight / targetSide);
const offsetX = Math.floor( (innerWidth - sidesInWidth*targetSide) / 2 );
const offsetY = gameInfoHeight + Math.floor( (gameHeight - sidesInHeight*targetSide) / 2 );

divTarget.style.width = targetSide + 'px';
divTarget.style.height = targetSide + 'px';

const getRandomPointX = () => offsetX + Math.floor( Math.random() * sidesInWidth ) * targetSide;
const getRandomPointY = () => offsetY + Math.floor( Math.random() * sidesInHeight ) * targetSide;

function startGame() {
    divMenuInfo.style.display = 'none';
    divGetScores.style.display = 'inline-block';
    scores = 0;
    gameTime = GAME_TIME;
    timeSpan.innerHTML = gameTime;
    timeoutTime = TARGET_AWAIT_START_TIME * 1000;

    divTarget.style.display = 'block';
    divTarget.style.left = getRandomPointX() + 'px';
    divTarget.style.top = getRandomPointY() + 'px';

    setTimeout( gameClock, 1000 );

    gameInterval = setInterval(() => {
        divTarget.style.left = getRandomPointX() + 'px';
        divTarget.style.top = getRandomPointY() + 'px';
    }, timeoutTime);
}

function gameClock() {
    gameTime--;
    timeSpan.innerHTML = gameTime;
    if (gameTime > 0) setTimeout( gameClock, 1000 );
    else gameEnd();
}

function gameEnd() {
    divTarget.style.display = 'none';
    divGetScores.style.display = 'none';
    clearInterval(gameInterval);
    divMenuInfo.style.display = 'block';

    if (scores > bestResult) bestResult = scores;
    timeSpan.innerHTML = gameTime;
    bestSpan.innerHTML = bestResult;
    bestScoreMenuSpan.innerHTML = bestResult;
}