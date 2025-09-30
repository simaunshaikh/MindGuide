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


    // --- 2. Mood Check-in & Music Player Logic ---

    // Mood Button Selection, Music Loading, and Launch
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            // UI Selection Logic
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
            
            // Show the correct music player
            updateMusicPlayer(selectedMood); 

            // Save the mood entry automatically (without journal text)
            saveMoodEntryOnly(selectedMood);
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

    // Save only the mood check-in (no journal text needed)
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

        loadMoodHistory(); // Refresh history instantly
    }

    // Load Mood History
    function loadMoodHistory() {
        const historyList = document.getElementById('mood-history-list');
        historyList.innerHTML = ''; // Clear existing list
        
        let entries = JSON.parse(localStorage.getItem('mindGuideMoodHistory')) || [];
        
        // Show only the last 7 entries
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
        loadJournalHistory(); // Refresh history
        
        setTimeout(() => saveMessage.style.display = 'none', 2000);
    }
    
    // Load Journal History
    function loadJournalHistory() {
        const historyList = document.getElementById('journal-history-list');
        historyList.innerHTML = ''; // Clear existing list
        
        let entries = JSON.parse(localStorage.getItem('mindGuideJournalEntries')) || [];
        
        // Show only the last 5 entries
        const lastFive = entries.slice(-5).reverse();

        if (lastFive.length === 0) {
            historyList.innerHTML = '<li>No journal entries yet.</li>';
            return;
        }

        lastFive.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.date} - "${item.entry.substring(0, 50)}${item.entry.length > 50 ? '...' : ''}"`;
            historyList.appendChild(li);
        });
    }

    // --- 4. Initial Load ---
    loadMoodHistory();
    loadJournalHistory();

});
