// Navigation
const therapyBtn = document.getElementById('therapyBtn');
const careerBtn = document.getElementById('careerBtn');
const settingsBtn = document.getElementById('settingsBtn');

const therapySec = document.getElementById('therapy');
const careerSec = document.getElementById('career');
const settingsSec = document.getElementById('settings');

therapyBtn.addEventListener('click', ()=>{showSection('therapy')});
careerBtn.addEventListener('click', ()=>{showSection('career')});
settingsBtn.addEventListener('click', ()=>{showSection('settings')});

function showSection(sec){
    therapySec.classList.remove('active');
    careerSec.classList.remove('active');
    settingsSec.classList.remove('active');
    therapyBtn.classList.remove('active');
    careerBtn.classList.remove('active');
    settingsBtn.classList.remove('active');
    if(sec==='therapy'){ therapySec.classList.add('active'); therapyBtn.classList.add('active'); }
    if(sec==='career'){ careerSec.classList.add('active'); careerBtn.classList.add('active'); }
    if(sec==='settings'){ settingsSec.classList.add('active'); settingsBtn.classList.add('active'); }
}

// Therapy & Music
const moodButtons = document.querySelectorAll('.mood-btn');
const therapyOutput = document.getElementById('therapyOutput');
const spotifyPlayer = document.getElementById('spotifyPlayer');

const defaultLinks = {
    happy:'https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC',
    sad:'https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1',
    stressed:'https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0'
};

moodButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const mood = btn.dataset.mood;
        let msg = '';
        if(mood==='happy'){ msg = 'You seem happy! Keep that positivity flowing!'; }
        if(mood==='sad'){ msg = 'Feeling sad is okay. Take deep breaths and reflect gently.'; }
        if(mood==='stressed'){ msg = 'Stress is normal. Try a short meditation or walk.'; }
        therapyOutput.innerHTML = msg;
        spotifyPlayer.src = localStorage.getItem(mood+'Link') || defaultLinks[mood];
    });
});

// Settings save
document.getElementById('saveSettings').addEventListener('click', ()=>{
    ['happy','sad','stressed'].forEach(mood=>{
        const val = document.getElementById(mood+'Link').value.trim();
        if(val) localStorage.setItem(mood+'Link', val);
    });
    document.getElementById('settingsOutput').innerText = 'Links saved locally!';
});

// Career Recommender
document.getElementById('careerBtnCompute').addEventListener('click', ()=>{
    const checkboxes = document.querySelectorAll('.career-checkbox');
    const selected = [];
    checkboxes.forEach(cb=>{ if(cb.checked) selected.push(cb.value); });
    let path = '';
    if(selected.includes('Programming')) path += 'Suggested Path: Software Developer\nSkills: HTML, CSS, JS, Python\n30-day roadmap: Build small apps daily.\n';
    if(selected.includes('Design')) path += 'Suggested Path: UX/UI Designer\nSkills: Figma, Photoshop\n30-day roadmap: Redesign 1 app interface daily.\n';
    if(selected.includes('Marketing')) path += 'Suggested Path: Digital Marketer\nSkills: SEO, Social Media Marketing\n30-day roadmap: Run mock campaigns.\n';
    if(selected.includes('Writing')) path += 'Suggested Path: Content Writer\nSkills: Blogging, Copywriting\n30-day roadmap: Write 1 article daily.\n';
    if(selected.includes('Leadership')) path += 'Suggested Path: Team Lead / Manager\nSkills: Communication, Management\n30-day roadmap: Lead small projects.\n';
    document.getElementById('careerOutput').innerText = path || 'Select at least one interest!';
});