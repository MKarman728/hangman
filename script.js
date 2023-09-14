const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const correctLetters = [];
const wrongLetters = [];
const words = ['application', 'programming', 'interface', 'wizard'];

const index = Math.floor(Math.random() * words.length);
let selectedWord;

// Generate Random Words
async function getRandomWord() {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await res.json();
    return data[0];
}


// Display the words on screen
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter => `<span class='letter'>
            ${correctLetters.includes(letter) ? letter : ''}
            </span>`)
            .join('')
        }
    `;
    const innerWord = word.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

// show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (e.key.charCodeAt() >= 97 && e.key.charCodeAt() <= 122) {
        const letter = e.key.toLowerCase();
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
})

// Restarget game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    startGame();
    updateWrongLettersEl();
    popup.style.display = 'none';
})

// Starts Game
async function startGame() {
    selectedWord = await getRandomWord();
    console.log(selectedWord)
    displayWord();
}

startGame();