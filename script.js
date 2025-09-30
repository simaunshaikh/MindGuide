// --- 1. Daily Mood Check-in & Journal ---

document.addEventListener('DOMContentLoaded', () => {
    let selectedMood = null;

    // Mood Button Selection, Music Loading, and Launch
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            // UI Selection Logic
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
            
            // Call Suggestion and LAUNCH MUSIC
            updateMusicPlayer(selectedMood); 
        });
    });

    // Function to show the correct Spotify player
    function updateMusicPlayer(mood) {
        const playerTitle = document.getElementById('player-title');
        const players = document.querySelectorAll('.mood-player');

        // Hide all players first
        players.forEach(p => p.style.display = 'none');
        
        let playerToShow = null;
        let titleText = '';

        // Determine which player to show
        if (mood === 'Happy') {
            playerToShow = document.getElementById('happy-player');
            titleText = 'Playlist Loaded: High Energy & Uplifting';
        } else if (mood === 'Stressed' || mood === 'Anxious') {
            playerToShow = document.getElementById('stressed-player');
            titleText = 'Playlist Loaded: Deep Focus & Calm';
        } else if (mood === 'Tired' || mood === 'Content') {
            playerToShow = document.getElementById('calm-player');
            titleText = 'Playlist Loaded: Lo-Fi & Relaxation';
        }

        // Display the selected player
        if (playerToShow) {
            playerToShow.style.display = 'block';
            playerTitle.textContent = titleText;
            playerTitle.style.color = 'var(--primary-color)';
        } else {
            playerTitle.textContent = 'Playlist not available for this mood.';
            playerTitle.style.color = 'red';
        }
    }


    // Save Button Logic (Existing)
    document.getElementById('save-mood-btn').addEventListener('click', saveMoodEntry);
    
    function saveMoodEntry() {
        const entry = document.getElementById('journal-entry').value.trim();
        const saveMessage = document.getElementById('save-message');
        const journalButton = document.querySelector('.mood-btn.selected');


        if (!journalButton) {
            saveMessage.textContent = 'Please select a mood first.';
            saveMessage.style.color = 'red';
            saveMessage.style.display = 'block';
            setTimeout(() => saveMessage.style.display = 'none', 2000);
            return;
        }
        
        // ... (Journal saving logic)
        const now = new Date();
        const dateString = now.toLocaleDateString();
        let entries = JSON.parse(localStorage.getItem('mindGuideJournal')) || [];
        const newEntry = {
            date: dateString,
            time: now.toLocaleTimeString(),
            mood: journalButton.getAttribute('data-mood'),
            entry: entry || 'No written reflection.',
        };
        entries.push(newEntry);
        localStorage.setItem('mindGuideJournal', JSON.stringify(entries));

        // Reset UI
        saveMessage.textContent = 'Check-in Saved!';
        saveMessage.style.color = 'var(--primary-color)';
        saveMessage.style.display = 'block';
        document.getElementById('journal-entry').value = '';
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
        selectedMood = null;
        document.getElementById('player-title').textContent = 'Select a mood above to load music!'; 
        
        // Hide the players after saving the journal
        document.querySelectorAll('.mood-player').forEach(p => p.style.display = 'none');


        loadMoodHistory(); 
        
        setTimeout(() => saveMessage.style.display = 'none', 2000);
    }

    // Load History on page load (Existing)
    loadMoodHistory();

    function loadMoodHistory() {
        const historyList = document.getElementById('mood-history-list');
        historyList.innerHTML = ''; 
        let entries = JSON.parse(localStorage.getItem('mindGuideJournal')) || [];
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


// --- 2. Focus Timer (Pomodoro) ---

let timer;
let timeLeft;
let isRunning = false;
let isWorkMode = true;

const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const currentMode = document.getElementById('current-mode');

// Initialize Timer
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
});
