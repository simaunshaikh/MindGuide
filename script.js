function showTherapy(mood, link) {
  document.getElementById('message').innerText =
    'Therapist: You seem ' + mood.toLowerCase() + '. Here is something to help you.';

  document.getElementById('music').innerHTML =
    '<iframe src="' + link + '" width="300" height="380" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
}