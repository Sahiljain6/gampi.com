// Typing Speed Test Variables
const typingText = document.getElementById("typingText");
const typingInput = document.getElementById("typingInput");
const timeLeftDisplay = document.getElementById("timeLeft");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restartButton");

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "Practice makes perfect, so keep typing.",
    "How fast can you type this sentence?",
    "Accuracy is as important as speed."
];

let timeLeft = 30; // Time in seconds
let timerInterval;
let currentText = "";
let totalCharactersTyped = 0;
let correctCharactersTyped = 0;

// Initialize the Typing Test
function startTypingTest() {
    resetGame();
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    typingText.textContent = currentText;
    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();
    startTimer();
}

// Start the Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Check Typing Input
typingInput.addEventListener("input", () => {
    totalCharactersTyped++;
    const typedText = typingInput.value;
    const isCorrect = currentText.startsWith(typedText);

    if (isCorrect) {
        correctCharactersTyped = typedText.length;
    }

    updateStats();
});

// Update Statistics
function updateStats() {
    const wordsTyped = totalCharactersTyped / 5; // Approx. 5 characters per word
    const minutesElapsed = (30 - timeLeft) / 60;
    const wpm = Math.round(wordsTyped / minutesElapsed || 0);

    const accuracy = Math.round((correctCharactersTyped / totalCharactersTyped) * 100 || 100);

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

// End the Game
function endGame() {
    typingInput.disabled = true;
    typingText.textContent = "Time's up! Try again.";
}

// Restart the Game
restartButton.addEventListener("click", startTypingTest);

// Reset the Game
function resetGame() {
    clearInterval(timerInterval);
    timeLeft = 30;
    totalCharactersTyped = 0;
    correctCharactersTyped = 0;
    timeLeftDisplay.textContent = timeLeft;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
}

// Start the Game on Load
startTypingTest();
