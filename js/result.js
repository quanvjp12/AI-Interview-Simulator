const answers = JSON.parse(localStorage.getItem('answers')) || [];
const reviewList = document.querySelector('#review_list');

const result = JSON.parse(localStorage.getItem('result')) || {};
const scoreElement = document.querySelector('#score');
const overallElement = document.querySelector('#overall');
const strengthsElement = document.querySelector('#strengths');
const improvementsElement = document.querySelector('#improvements');
const recommendationsElement = document.querySelector('#recommendations');
const scoreTitle = document.querySelector('#score_title');
const scoreDescription = document.querySelector('#score_description');

answers.forEach(function(item, index) {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review_card');

    reviewCard.innerHTML = `
        <button type="button" class="review_header">
            <span class="review_number">
                Q${index + 1}
            </span>
            <span class="review_question">
                ${item.question}
            </span>
        </button>
        <div class="review_content">
            <div class="review_answer">
                <span class="review_answer_label">
                    YOUR ANSWER
                </span>
                <p>${item.answer}</p>
            </div>
        </div>
    `;

    const reviewHeader = reviewCard.querySelector('.review_header');
    reviewHeader.addEventListener('click', function() {
        const allCard = document.querySelectorAll('.review_card');
        allCard.forEach( function(card){
            if(card != reviewCard){
                card.classList.remove('open');
            }
        });
        reviewCard.classList.toggle('open');
    });
    reviewList.appendChild(reviewCard);
});

scoreElement.textContent = result.score ?? '--';
overallElement.textContent = result.overall ?? 'No result available.';


strengthsElement.textContent = '';
result.strengths.forEach(function(item) {
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback_item');
    feedbackItem.innerHTML = `
        <span class="feedback_icon success">✓</span>
        <span>${item}</span>
    `;
    strengthsElement.appendChild(feedbackItem);
});

improvementsElement.textContent = '';
result.improvements.forEach(function(item) {
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback_item');
    feedbackItem.innerHTML = `
        <span class="feedback_icon warning">!</span>
        <span>${item}</span>
    `;
    improvementsElement.appendChild(feedbackItem);
});

recommendationsElement.textContent = '';
result.recommendations.forEach(function(item) {
    const recommendation = document.createElement('p');
    recommendation.textContent = item;
    recommendationsElement.appendChild(recommendation);
});

const position = localStorage.getItem('position');
const level = localStorage.getItem('level');

if (result.score >= 90) {
    scoreTitle.textContent = 'Excellent Performance';
} else if (result.score >= 80) {
    scoreTitle.textContent = 'Very Good Performance';
} else if (result.score >= 65) {
    scoreTitle.textContent = 'Good Performance';
} else if (result.score >= 50) {
    scoreTitle.textContent = 'Fair Performance';
} else {
    scoreTitle.textContent = 'Needs Improvement';
}

const positionNames = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    fullstack: 'Full Stack Developer',
    itsupport: 'IT Support',
    qa: 'QA Tester'
};

const levelNames = {
    fresher: 'Fresher',
    junior: 'Junior',
    mid: 'Mid-level'
};

scoreDescription.textContent = `${positionNames[position]} · ${levelNames[level]}`;