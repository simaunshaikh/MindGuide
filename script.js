// --- 1. Daily Mood Check-in & Journal ---

document.addEventListener('DOMContentLoaded', () => {
    let selectedMood = null;

    // Mood Button Selection
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' from all buttons
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            
            // Add 'selected' to the clicked button
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
        });
    });

    // Save Button Logic
    document.getElementById('save-mood-btn').addEventListener('click', saveMoodEntry);
    
    function saveMoodEntry() {
        const entry = document.getElementById('journal-entry').value.trim();
        const saveMessage = document.getElementById('save-message');

        if (!selectedMood) {
            saveMessage.textContent = 'Please select a mood first.';
            saveMessage.style.color = 'red';
            saveMessage.style.display = 'block';
            setTimeout(() => saveMessage.style.display = 'none', 2000);
            return;
        }

        const now = new Date();
        const dateString = now.toLocaleDateString();

        // Load existing entries
        let entries = JSON.parse(localStorage.getItem('mindGuideJournal')) || [];

        // Create new entry
        const newEntry = {
            date: dateString,
            time: now.toLocaleTimeString(),
            mood: selectedMood,
            entry: entry || 'No written reflection.',
        };
        
        // Add new entry and save
        entries.push(newEntry);
        localStorage.setItem('mindGuideJournal', JSON.stringify(entries));

        // Display success message
        saveMessage.textContent = 'Check-in Saved!';
        saveMessage.style.color = 'var(--primary-color)';
        saveMessage.style.display = 'block';

        // Reset UI
        document.getElementById('journal-entry').value = '';
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
        selectedMood = null;
        loadMoodHistory(); // Refresh history
        
        setTimeout(() => saveMessage.style.display = 'none', 2000);
    }

    // Load History on page load
    loadMoodHistory();

    function loadMoodHistory() {
        const historyList = document.getElementById('mood-history-list');
        historyList.innerHTML = ''; // Clear existing list
        
        let entries = JSON.parse(localStorage.getItem('mindGuideJournal')) || [];
        
        // Show only the last 5 entries
        const lastFive = entries.slice(-5).reverse();

        if (lastFive.length === 0) {
            historyList.innerHTML = '<li>No history yet. Make a check-in!</li>';
            return;
        }

        lastFive.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.date} - ${item.mood}: "${item.entry.substring(0, 30)}${item.entry.length > 30 ? '...' : ''}"`;
            historyList.appendChild(li);
        });
    }

});


// --- 2. Focus Timer (Pomodoro) ---

let timer;
let timeLeft;
let isRunning = false;
let isWorkMode = true;

// Pomodoro times in seconds
const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const currentMode = document.getElementById('current-mode');

// Initialize
timeLeft = WORK_TIME;
updateDisplay();

startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

function updateDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    document.title = `${minutes}:${seconds} | MindGuide Focus`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        isRunning = false;
    } else {
        timer = setInterval(countdown, 1000);
        startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        isRunning = true;
    }
}

function countdown() {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        
        // Play a simple alert sound (Optional: you can replace with a custom sound)
        // NOTE: The user must click or interact with the page once for sound to work in modern browsers.
        // new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3').play();

        // Switch modes
        isWorkMode = !isWorkMode;
        
        if (isWorkMode) {
            timeLeft = WORK_TIME;
            currentMode.textContent = 'Work (25 min)';
        } else {
            timeLeft = BREAK_TIME;
            currentMode.textContent = 'Break (5 min)';
        }
        
        updateDisplay();
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        
        // Automatically start the next session after a short pause
        setTimeout(toggleTimer, 3000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkMode = true;
    timeLeft = WORK_TIME;
    updateDisplay();
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    currentMode.textContent = 'Work (25 min)';
}
