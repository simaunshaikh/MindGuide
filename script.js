function showTherapy(mood, link) {
  const messages = {
    Happy: "You seem happy! Keep spreading the positive vibes 🌟",
    Sad: "Feeling sad is okay. Take a deep breath and listen to something soothing 💙",
    Stressed: "Take a moment to relax. Music can help ease stress 🧘‍♀️",
    Angry: "Channel your anger into something productive. Try calming tracks 🔥",
    Relax: "Time to unwind. Let the music guide your relaxation 🌿",
    Energetic: "Feeling pumped! Let’s keep the energy going 💥"
  };

  document.getElementById('message').innerText = "Therapist: " + messages[mood];

  document.getElementById('music').innerHTML =
    `<iframe src="${link}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
}