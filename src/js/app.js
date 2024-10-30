const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍊', '🍓', '🍒', '🍍'];
const cards = [...cardValues, ...cardValues];
let flippedCards = [];
let score = 0;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

function initGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    scoreDisplay.innerText = score;
    flippedCards = [];

    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="back">?</div>
            <div class="front">${value}</div>
        `;
        card.addEventListener('click', () => flipCard(card, value));
        gameBoard.appendChild(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card, value) {
    if(flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push({ card, value });

        if(flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.value === secondCard.value) {
        score++;
        matchedPairs++;
        scoreDisplay.textContent = score;

        if(matchedPairs === cardValues.length) {
            setTimeout(() => {
                if (confirm('You won! Play again?')) {
                    initGame();
                } else {
                    alert('Thanks for playing!\nYour score: ' + score);
                    score = 0;
                    initGame();
                }
            }, 500);
        }
    } else {
        firstCard.card.classList.remove('flipped');
        secondCard.card.classList.remove('flipped');
    }
    flippedCards = [];
}

restartButton.addEventListener('click', initGame);

initGame();