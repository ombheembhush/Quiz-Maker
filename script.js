const quizData = [
    {
        question: "Which comes right before june?",
        a: "May",
        b: "September",
        c: "July",
        d: "August",
        correct: "a",
        feedback: "The correct answer is May. May is there right before june."
    },
    {
        question: "What time of day do we have breakfast?",
        a: "In the afternoon",
        b: "In the evening",
        c: "In the morning",
        correct: "c",
        feedback: "The correct answer is In the morning. Basically,all we have our breakfast in the morning."
    },
    {
        question: "Windows, macOS, and Linux are examples of ________.",
        a: "web browsers",
        b: "mobile devices",
        c: "filmy heroines",
        d: "operating systems",
        correct: "d",
        feedback: "The correct answer is operating systems. Windows, macOS, and Linux are operating systems."
    },
    {
        question: "What does 'GUI' stand for?",
        a: "Global user index",
        b: "Graphical user interface",
        c: "golu use iphone",
        correct: "b",
        feedback: "The correct answer is Graphical User Interface. GUI stands for Graphical User Interface."
    },
    {
        question: "Mark Zuckerberg is the owner of?",
        a: "facebook",
        b: "google",
        c: "linux",
        d: "linkedin",
        correct: "a",
        feedback: "The correct answer is Facebook. Mark Zuckerberg is the owner of Facebook."
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    feedbackEl.innerText = '';
    feedbackEl.classList.remove('visible');
    feedbackEl.classList.add('hidden');
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function getOverallFeedback(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
        return "Excellent! You got all questions correct!";
    } else if (percentage >= 80) {
        return "Great job! You have a strong understanding of the material.";
    } else if (percentage >= 50) {
        return "Good effort! Keep practicing to improve your score.";
    } else {
        return "You might need to review the material. Don't give up!";
    }
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        const currentQuizData = quizData[currentQuiz];
        if (answer === currentQuizData.correct) {
            score++;
            feedbackEl.innerText = `Correct! ${currentQuizData.feedback}`;
        } else {
            feedbackEl.innerText = `Incorrect! ${currentQuizData.feedback}`;
        }
        feedbackEl.classList.remove('hidden');
        feedbackEl.classList.add('visible');

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            setTimeout(loadQuiz, 3000);
        } else {
            setTimeout(() => {
                const overallFeedback = getOverallFeedback(score, quizData.length);
                quiz.innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                    <p>${overallFeedback}</p>
                    <button onclick="location.reload()">Reload</button>
                `;
            }, 3000);
        }
    }
});
