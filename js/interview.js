const API_URL = 'https://ai-interview-backend-7yg0.onrender.com'; 

const position = localStorage.getItem('position');
const level = localStorage.getItem('level');
const questions = Number(localStorage.getItem('questions'));
const language = localStorage.getItem('language');

console.log('Position:', position);
console.log('Level:', level);
console.log('Questions:', questions);
console.log('Language:', language);

const errorModal = document.querySelector('#error_modal');
const errorMessage = document.querySelector('#error_message');
const errorClose = document.querySelector('#error_close');

const positionElement = document.querySelector('#interview_position');
const questionProgress = document.querySelector('#question_progress');
const questionCount = document.querySelector('#question_count');
const questionElement = document.querySelector('.question_card h1');
const answerInput = document.querySelector('#answer');
const submitBtn = document.querySelector('.submit_btn');
const progressValue = document.querySelector('.progress_value');

const positionNames = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    fullstack: 'Full Stack Developer',
    itsupport: 'IT Support',
    qa: 'QA Tester'
};

positionElement.textContent = positionNames[position];
questionProgress.textContent = `Question 1 of ${questions}`;
questionCount.textContent = `1 / ${questions}`;

let currentQuestion = 1;
const answers = [];

function updateProgress() {
    const percent = Math.min((currentQuestion / questions) * 100, 100);
    progressValue.style.width = percent + '%';
}

updateProgress();

const questionCard = document.querySelector('.question_card');

questionCard.classList.add('loading');

fetch(`${API_URL}/api/interview/start`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        position: position,
        level: level,
        questions: questions,
        language: language
    })
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log('AI question:', data.question);
    questionElement.textContent = data.question;
    questionCard.classList.remove('loading');
})
.catch(function(error) {
    console.error('Error:', error);
    questionElement.textContent = 'Failed to load interview question.';
    questionCard.classList.remove('loading');
    answerInput.disabled = true;
    submitBtn.disabled = true;
});

submitBtn.addEventListener('click', async function() {
    const answer = answerInput.value.trim();
    if( answer === ""){
        alert('Please enter your answer.');
        return;
    }
    const currentQuestionText = questionElement.textContent;
    answers.push({
        question: currentQuestionText,
        answer: answer
    });// Lưu câu trả lời
    console.log('Answers:', answers);

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Đang xử lý...';
    answerInput.disabled = true;
    try {
        const response = await fetch(`${API_URL}/api/interview/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position: position,
                level: level,
                questions: questions,
                language: language,
                question: currentQuestionText,
                answer: answer,
                history: answers,
                currentQuestion: currentQuestion
            })
        });
        const data = await response.json();
        
        console.log('Next AI question:', data.nextQuestion);
        
        console.log('AI response:', data);
        if (data.finished) {
            console.log('Final result:', data.result);
            localStorage.setItem('answers', JSON.stringify(answers));
            localStorage.setItem('result', JSON.stringify(data.result));
            window.location.href = 'result.html';
        } else {
            currentQuestion++;
            questionElement.textContent = data.nextQuestion;
            questionProgress.textContent = `Question ${currentQuestion} of ${questions}`;
            questionCount.textContent = `${currentQuestion} / ${questions}`;
            updateProgress();
            answerInput.value = '';
            answerInput.disabled = false;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit Answer →';
        }
    } catch (error) {
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Submit Answer →';
        answerInput.disabled = false;
    }
});
function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('show');
}

errorClose.addEventListener('click', function() {
    errorModal.classList.remove('show');
});