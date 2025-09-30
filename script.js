document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Variables ---
    let selectedMood = null;

    // --- 1. View Switching (SPA Logic) ---
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetViewId = this.getAttribute('data-view');
            showView(targetViewId);
            
            // Re-load history every time we switch to ensure data is fresh
            if (targetViewId === 'mood-view') {
                loadMoodHistory();
            } else if (targetViewId === 'journal-view') {
                loadJournalHistory();
            }
        });
    });

    function showView(viewId) {
        // Update button styles
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-view="${viewId}"]`).classList.add('active');

        // Hide all views
        document.querySelectorAll('.view').forEach(view => view.style.display = 'none');

        // Show target view
        document.getElementById(viewId).style.display = 'block';
    }


    // --- 2. Unified Mood Selection Logic ---
    
    // Selects mood buttons on BOTH views
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentView = this.closest('.view').id;
            
            // Clear selection only within the current view's mood options
            this.closest('.mood-options').querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
            
            if (currentView === 'mood-view') {
                // If on Mood View, update music and save history instantly
                updateMusicPlayer(selectedMood); 
                saveMoodEntryOnly(selectedMood);
            }
            // If on Journal View, the mood will be saved when the save button is clicked
        });
    });
    
    // Function to show the correct Spotify player
    function updateMusicPlayer(mood) {
        const playerTitle = document.getElementById('player-title');
        const players = document.querySelectorAll('.mood-player');

        players.forEach(p => p.style.display = 'none');
        
        let playerToShow = null;
        let titleText = '';

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

        if (playerToShow) {
            playerToShow.style.display = 'block';
            playerTitle.textContent = titleText;
            playerTitle.style.color = 'var(--primary-color)';
        } else {
            playerTitle.textContent = 'Playlist not available for this mood.';
            playerTitle.style.color = 'red';
        }
    }

    // Save only the mood check-in for the history list
    function saveMoodEntryOnly(mood) {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        
        let entries = JSON.parse(localStorage.getItem('mindGuideMoodHistory')) || [];

        const newEntry = {
            date: dateString,
            time: now.toLocaleTimeString(),
            mood: mood,
        };
        
        entries.push(newEntry);
        localStorage.setItem('mindGuideMoodHistory', JSON.stringify(entries));

        loadMoodHistory();
    }

    // Load Mood History
    function loadMoodHistory() {
        const historyList = document.getElementById('mood-history-list');
        historyList.innerHTML = '';
        
        let entries = JSON.parse(localStorage.getItem('mindGuideMoodHistory')) || [];
        const lastSeven = entries.slice(-7).reverse();

        if (lastSeven.length === 0) {
            historyList.innerHTML = '<li>No mood history yet. Make a check-in!</li>';
            return;
        }

        lastSeven.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.date} at ${item.time} - ${item.mood}`;
            historyList.appendChild(li);
        });
    }

    // --- 3. Daily Journal Logic ---

    document.getElementById('save-journal-btn').addEventListener('click', saveJournalEntry);

    function saveJournalEntry() {
        const entry = document.getElementById('journal-entry').value.trim();
        const saveMessage = document.getElementById('journal-save-message');
        
        // **GET SELECTED MOOD FROM JOURNAL VIEW**
        const moodButton = document.querySelector('#journal-view .journal-mood-btn.selected');


        if (!moodButton) {
             saveMessage.textContent = 'Please select a mood first.';
            saveMessage.style.color = 'red';
            saveMessage.style.display = 'block';
            setTimeout(() => saveMessage.style.display = 'none', 2000);
            return;
        }

        if (!entry) {
            saveMessage.textContent = 'Please write something before saving.';
            saveMessage.style.color = 'red';
            saveMessage.style.display = 'block';
            setTimeout(() => saveMessage.style.display = 'none', 2000);
            return;
        }

        const now = new Date();
        const dateString = now.toLocaleDateString();
        
        let entries = JSON.parse(localStorage.getItem('mindGuideJournalEntries')) || [];

        const newEntry = {
            date: dateString,
            time: now.toLocaleTimeString(),
            mood: moodButton.getAttribute('data-mood'), // Save the selected mood!
            entry: entry,
        };
        
        entries.push(newEntry);
        localStorage.setItem('mindGuideJournalEntries', JSON.stringify(entries));

        // Display success message
        saveMessage.textContent = 'Journal Entry Saved!';
        saveMessage.style.color = 'var(--primary-color)';
        saveMessage.style.display = 'block';

        // Reset UI
        document.getElementById('journal-entry').value = '';
        document.querySelectorAll('#journal-view .journal-mood-btn').forEach(btn => btn.classList.remove('selected'));
        loadJournalHistory();
        
        setTimeout(() => saveMessage.style.display = 'none', 2000);
    }
    
    // Load Journal History
    function loadJournalHistory() {
        const historyList = document.getElementById('journal-history-list');
        historyList.innerHTML = '';
        
        let entries = JSON.parse(localStorage.getItem('mindGuideJournalEntries')) || [];
        const lastFive = entries.slice(-5).reverse();

        if (lastFive.length === 0) {
            historyList.innerHTML = '<li>No journal entries yet.</li>';
            return;
        }

        lastFive.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.date} (${item.mood}): "${item.entry.substring(0, 50)}${item.entry.length > 50 ? '...' : ''}"`;
            historyList.appendChild(li);
        });
    }

    // --- 4. Initial Load ---
    loadMoodHistory();
    loadJournalHistory();

});
