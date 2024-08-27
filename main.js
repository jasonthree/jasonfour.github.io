const questions = [
    {
        question: "What is your favorite color?",
        answers: [
            { text: "Blue", correct: false},
            { text: "Green", correct: true},
            { text: "Red", correct: false},
            { text: "Yellow", correct: false},
        ]
    },
    {
        question: "What is your favorite flower?",
        answers: [
            { text: "Sunflower", correct: false},
            { text: "Hibiscus", correct: true},
            { text: "Plumeria", correct: true},
            { text: "Tulips", correct: false},
        ]
    },
    {
        question: "What is your favorite movie?",
        answers: [
            { text: "Moana", correct: true},
            { text: "The Notebook", correct: false},
            { text: "Barbie", correct: false},
            { text: "500 Days of Summer", correct: false},
        ]
    },
    {
        question: "What can't you eat?",
        answers: [
            { text: "Raw Food", correct: true},
            { text: "Peanut butter", correct: false},
            { text: "Cheese", correct: false},
            { text: "Grapes", correct: true},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    // Go to another page
    let redirectButton = document.createElement("button");
    redirectButton.innerHTML = "Click this!";
    redirectButton.classList.add("redirect-btn");
    redirectButton.style.display = "inline-block";
    redirectButton.style.marginTop = "10px";

    nextButton.parentNode.appendChild(redirectButton);

    redirectButton.addEventListener("click", () => {
        window.location.href = 'https://jasonthree.github.io/';
    });
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();