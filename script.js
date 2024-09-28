const quizQuestions = document.getElementById('question');
const questionOptions = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
let questions = [];
let currentIndex = 0;

function fetchQuestions() {
    fetch('https://the-trivia-api.com/v2/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions();
            // console.log(data);
            
        })
        .catch(error => console.error('Error:', error));
}

function displayQuestions() {
    const currentQuestion = questions[currentIndex];
    quizQuestions.textContent = currentQuestion.question.text;

    questionOptions.innerHTML = '';

    const allAnswers = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;

        button.onclick = () => {
            if (answer === currentQuestion.correctAnswer) {
                button.style.backgroundColor = 'green'; 
            } else {
                button.style.backgroundColor = 'red'; 
            }
        };
        questionOptions.appendChild(button);
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < questions.length) { 
        displayQuestions();
    } else {
        alert('No more questions!!!');
        currentIndex = 0; 
        displayQuestions();
    }
});

fetchQuestions();
