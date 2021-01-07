// DOM variables
const displayWord = document.querySelector('#word');
const displayWrongLetters = document.querySelector('#wrong-letters');
const popup = document.querySelector('#popup-container');
const popupMessage = document.querySelector('#popup-message');
const notification = document.querySelector('#notification-container');
const figureParts = document.querySelectorAll('.figure-part');
const playAgainBtn = document.querySelector('#play-again');

// Word pool
const words = ['frontend', 'backend', 'programming', 'interface', 'application', 'computer', 'laptop', 'keyboard', 'developer', 'coder'];
// Get random word 
let selectedWord = words[Math.floor(Math.random() * words.length)];
// Creating variables wrong and correct letters array
const correctLetters = [];
const wrongLetters = [];

// Functions 

// show hidden words
function showHiddenWord() {
  displayWord.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')
    }   
  `;

  //  remove new line break
  const innerWord = displayWord.innerText.replace(/(\r\n|\n|\r)/gm,"");
  // check word
  if(innerWord === selectedWord) {
    popupMessage.innerText = 'Nice, you guess the hidden word!';
    popup.style.display = 'flex';
  }
}

// Update wrong letters
function updateWrongLetter() {
  //Display wrong letter
  displayWrongLetters.innerHTML =`
    ${wrongLetters.length > 0 ? '<p>Wrong Letters: </p>' : ''}
    ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
  `
  // Add figure
  figureParts.forEach((part, index) => {
    const wrong = wrongLetters.length;

    if(index < wrong) {
      part.style.display = 'block';      
    } else {
      part.style.display = 'none';
    }
  })
  // Check if user lost
  if(wrongLetters.length === figureParts.length) {
    popupMessage.innerText = 'Sorry you lost, better luck next time';
    popup.style.display = 'flex';
  }
}

// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000);
}

// Event listeners

// Game functionality
// Letter press
window.addEventListener('keydown', (e) => {
  if(e.code >= 'KeyA' && e.code <= 'KeyZ' ) {
    // Save letter into a variable
    const letter = e.key;
    // check if letter is in the selected word
    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);

        showHiddenWord();
      } else {
        showNotification()
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetter();
      } else {
        showNotification();
      }
    }    
  }
})

// Restart and play again button
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.length = 0;
  wrongLetters.length = 0;
  // correctLetters.splice(0);
  // wrongLetters.splice(0);
  // Get random word from the array  
  selectedWord = words[Math.floor(Math.random() * words.length)]
  // Call hidden word
  showHiddenWord();
  // Clean wrong letter and figure
  updateWrongLetter();
  // Hide the pop
  popup.style.display = 'none';

})



showHiddenWord()


