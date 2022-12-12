'use strict'

const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
const diceImg = document.querySelector('img');
const player = document.querySelector('.player');
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

let addCurrent, activePlayer, continuePlaying, scores;
resetGame();

function switchPlayer() {
    addCurrent = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0El.classList.toggle('active-player');
    player1El.classList.toggle('active-player');
}

function resetGame() {
    addCurrent = 0;
    activePlayer = 0;
    continuePlaying = true;
    scores = [0, 0];

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    dice.classList.add('hidden');
    player0El.classList.add('active-player');
    player1El.classList.remove('active-player');
    player0El.classList.remove('winner');
    player1El.classList.remove('winner');
}


btnRoll.addEventListener('click', function() {
    if (continuePlaying) {
        dice.classList.remove('hidden');
        //random number and dice 
        const diceNumber = Math.ceil(Math.random() * 6);
        diceImg.src = `/img/dice-${diceNumber}.png`;
        //adding current number
        addCurrent += diceNumber;
        document.getElementById(`current-${activePlayer}`).textContent = addCurrent;

        if (diceNumber === 1) {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function() {
    if (continuePlaying) {
        scores[activePlayer] += addCurrent;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        //winner condition
        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player-${activePlayer}`).classList.add('winner');
            continuePlaying = false;
            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', resetGame)