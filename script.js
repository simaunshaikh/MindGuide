<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MindGuide - Mood & Music</title>
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>

    <header>
        <h1>MindGuide</h1>
        <p>Your daily check-in for well-being.</p>
        <nav class="tabs">
            <button class="tab-btn active" data-view="mood-view"><i class="fas fa-heart"></i> Mood Check-in</button>
            <button class="tab-btn" data-view="journal-view"><i class="fas fa-book"></i> Daily Journal</button>
        </nav>
    </header>

    <main>
        
        <!-- ============================================== -->
        <!-- MOOD CHECK-IN & MUSIC VIEW (Default Active) -->
        <!-- ============================================== -->
        <div id="mood-view" class="view">
            <section class="card">
                <h2><i class="fas fa-music"></i> Select Your Mood</h2>
                <p>How are you feeling right now? Music will play automatically based on your choice.</p>
                <div class="mood-options">
                    <button class="mood-btn" data-mood="Happy">😊 Happy</button>
                    <button class="mood-btn" data-mood="Content">😌 Content</button>
                    <button class="mood-btn" data-mood="Stressed">😰 Stressed</button>
                    <button class="mood-btn" data-mood="Tired">😴 Tired</button>
                    <button class="mood-btn" data-mood="Anxious">😟 Anxious</button>
                </div>
                
                <!-- Music Player Area -->
                <div id="music-player-area">
                    <h3 id="player-title" style="margin-top: 20px; color: var(--accent-color);">Please select a mood above.</h3>
                    
                    <div class="spotify-players">
                        <!-- IMPORTANT: REPLACE THE 'src' ATTRIBUTE WITH YOUR ACTUAL SPOTIFY EMBED URLS! -->

                        <!-- Happy Playlist Player (Shown for Happy) -->
                        <iframe id="happy-player" class="mood-player" style="border-radius:12px; display: none;" 
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                        <!-- Stressed/Anxious Playlist Player -->
                        <iframe id="stressed-player" class="mood-player" style="border-radius:12px; display: none;" 
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0BxnsZ7yWvg?utm_source=generator" 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        
                        <!-- Tired/Calm Playlist Player (Shown for Tired/Content) -->
                        <iframe id="calm-player" class="mood-player" style="border-radius:12px; display: none;" 
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>

                <!-- Mood History -->
                <div class="history-container">
                    <h3><i class="fas fa-list"></i> Recent Mood History</h3>
                    <ul id="mood-history-list">
                        <li>History loading...</li>
                    </ul>
                </div>
            </section>
        </div>


        <!-- ============================================== -->
        <!-- JOURNAL ENTRY VIEW (Hidden by Default) -->
        <!-- ============================================== -->
        <div id="journal-view" class="view" style="display: none;">
            <section class="card">
                <h2><i class="fas fa-pencil-alt"></i> Write Your Journal Entry</h2>
                <p>Reflect on your day and save your thoughts for persistent record keeping.</p>

                <textarea id="journal-entry" placeholder="Today, I feel..."></textarea>
                <button id="save-journal-btn">Save Journal Entry</button>
                <p id="journal-save-message" class="message"></p>

                <div class="history-container">
                    <h3><i class="fas fa-calendar-alt"></i> Recent Entries</h3>
                    <ul id="journal-history-list">
                        <li>Entries loading...</li>
                    </ul>
                </div>
            </section>
        </div>

    </main>

    <footer>
        <p>&copy; 2024 MindGuide. Focus on your well-being.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
