const setupForm = document.querySelector('.setup_form');

setupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.removeItem('answers');
    localStorage.removeItem('result');

    const position = document.querySelector('#position').value;
    const level = document.querySelector('input[ name="level"]:checked').value;
    const questions = document.querySelector('input[name="questions"]:checked').value;
    const language = document.querySelector('#language').value;

    localStorage.setItem('position', position);
    localStorage.setItem('level', level);
    localStorage.setItem('questions', questions);
    localStorage.setItem('language', language);

    window.location.href = 'interview.html';
});