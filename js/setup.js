const API_URL = 'http://localhost:3000';

fetch(`${API_URL}/api/health`, { method: 'GET' }).catch(function() {});

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

// Xử lý xác nhận khi bấm nút Back (←)
const backBtn = document.querySelector('#back_btn');
const confirmModal = document.querySelector('#confirm_leave_modal');
const confirmCancel = document.querySelector('#confirm_cancel');
const confirmLeave = document.querySelector('#confirm_leave');

if (backBtn && confirmModal) {
    backBtn.addEventListener('click', function() {
        confirmModal.classList.add('show');
    });

    confirmCancel.addEventListener('click', function() {
        confirmModal.classList.remove('show');
    });

    confirmLeave.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Bấm ra ngoài vùng modal để đóng
    confirmModal.addEventListener('click', function(event) {
        if (event.target === confirmModal) {
            confirmModal.classList.remove('show');
        }
    });
}