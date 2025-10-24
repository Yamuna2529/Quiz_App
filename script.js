const questions = [
    {
        question: "Who invented Java Programming?",
        answers: [
            { text: "Guido van Rossum", correct: false },
            { text: "Dennis Ritchie", correct: false },
            { text: "James Gosling", correct: true },
            { text: "Bjarne Stroustrup", correct: false }
        ]
    },
    {
        question: "Which one of the following is not a Java feature?",
        answers: [
            { text: "Object-oriented", correct: false },
            { text: "Use of pointers", correct: true },
            { text: "Portable", correct: false },
            { text: "Dynamic and Extensible", correct: false }
        ]
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        answers: [
            { text: "super", correct: false },
            { text: "this", correct: false },
            { text: "extends", correct: true },
            { text: "implements", correct: false }
        ]
    },
    {
        question: "Which data type is used to create a variable that should store text?",
        answers: [
            { text: "String", correct: true },
            { text: "Txt", correct: false },
            { text: "myString", correct: false },
            { text: "string", correct: false }
        ]
    },
    {
        question: "Which method can be used to find the length of a string in Java?",
        answers: [
            { text: "length()", correct: true },
            { text: "getSize()", correct: false },
            { text: "size()", correct: false },
            { text: "getLength()", correct: false }
        ]
    },
    {
        question: "Which symbol is used to import a package in Java?",
        answers: [
            { text: "#", correct: false },
            { text: "import", correct: true },
            { text: "include", correct: false },
            { text: "@", correct: false }
        ]
    },
    {
        question: "Which of these is not a Java access modifier?",
        answers: [
            { text: "protected", correct: false },
            { text: "private", correct: false },
            { text: "internal", correct: true },
            { text: "public", correct: false }
        ]
    },
    {
        question: "What is the default value of a boolean variable in Java?",
        answers: [
            { text: "true", correct: false },
            { text: "false", correct: true },
            { text: "0", correct: false },
            { text: "null", correct: false }
        ]
    },
    {
        question: "Which of the following is not an OOP concept in Java?",
        answers: [
            { text: "Encapsulation", correct: false },
            { text: "Polymorphism", correct: false },
            { text: "Compilation", correct: true },
            { text: "Inheritance", correct: false }
        ]
    },
    {
        question: "Which collection class allows duplicate elements?",
        answers: [
            { text: "Set", correct: false },
            { text: "List", correct: true },
            { text: "Map", correct: false },
            { text: "Enum", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    nextButton.classList.remove('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', (event) => selectAnswer(event, answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(event, answer) {
    const selectedButton = event.target;

    // If correct
    if (answer.correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    // Disable all buttons & highlight correct answer
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
        const ans = questions[currentQuestionIndex].answers.find(a => a.text === button.innerText);
        if (ans.correct) button.classList.add('correct');
    });

    nextButton.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    scoreElement.innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
    startQuiz();
}

nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

startQuiz();

