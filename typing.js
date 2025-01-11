// Typing Speed Test Variables
const typingText = document.getElementById("typingText");
const typingInput = document.getElementById("typingInput");
const timeLeftDisplay = document.getElementById("timeLeft");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restartButton");

const sampleWords = [
    "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
    "practice", "makes", "perfect", "keep", "typing", "accuracy", "speed",
    "words", "challenge", "improve", "skill", "fun", "typing", "test"
];

let timeLeft = 60; // Time in seconds
let timerInterval;
let currentText = "";
let totalCharactersTyped = 0;
let correctCharactersTyped = 0;
let totalWords = 0;

// Generate a 1000-word paragraph
function generateParagraph(wordCount) {
    let paragraph = "";
    for (let i = 0; i < wordCount; i++) {
        paragraph += sampleWords[Math.floor(Math.random() * sampleWords.length)] + " ";
    }
    return paragraph.trim();
}

// Initialize the Typing Test
function startTypingTest() {
    resetGame();
    currentText = generateParagraph(1000); // Generate 1000-word text
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
    const minutesElapsed = (60 - timeLeft) / 60;
    const wpm = Math.round(wordsTyped / minutesElapsed || 0);

    const accuracy = Math.round((correctCharactersTyped / totalCharactersTyped) * 100 || 100);

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

// End the Game and Show Report
function endGame() {
    typingInput.disabled = true;
    const finalWpm = wpmDisplay.textContent;
    const finalAccuracy = accuracyDisplay.textContent;

    typingText.innerHTML = `
        <h2>Time's up! Here's your report:</h2>
        <p><strong>Words Per Minute (WPM):</strong> ${finalWpm}</p>
        <p><strong>Accuracy:</strong> ${finalAccuracy}%</p>
        <p><strong>Total Words:</strong> ${Math.round(totalCharactersTyped / 5)}</p>
        <p><strong>Correct Words:</strong> ${Math.round(correctCharactersTyped / 5)}</p>
    `;
    restartButton.textContent = "Restart Test";
    restartButton.style.display = "block";
}

// Restart the Game
restartButton.addEventListener("click", startTypingTest);

// Reset the Game
function resetGame() {
    clearInterval(timerInterval);
    timeLeft = 60;
    totalCharactersTyped = 0;
    correctCharactersTyped = 0;
    totalWords = 0;
    timeLeftDisplay.textContent = timeLeft;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    restartButton.style.display = "none";
}

// Start the Game on Load
startTypingTest();
