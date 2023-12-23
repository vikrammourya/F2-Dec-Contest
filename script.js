const homeSection = document.getElementById("home-section");
const topicsSection = document.getElementById("topics-section");
const categorySection = document.getElementById("category-page");

function selectingSubject() {
  let subjectButton = document.getElementById("subjectButton");

  let subjectElement = document.getElementsByClassName("into-mark-icon");
  subjectButton.addEventListener("click", () => {
    subjectButton.style.backgroundColor = "#FCC822";
    if (subjectElement.style.display === "none") {
      subjectElement.classList.remove("into-mark-icon");
    }
  });
}

function displayTopicSection() {
  /*let profileContainer=document.getElementsByClassName('profile');
  console.log(profileContainer)
  if(profileContainer.style.display==='none'){
    profileContainer.style.display='flex';
  }*/

  if (
    topicsSection.style.display === "none" ||
    topicsSection.style.display === ""
  ) {
    topicsSection.style.display = "flex";
    topicsSection.style.justifyContent = "center";
    homeSection.classList.toggle("blur-background");
  } else {
    topicsSection.style.display = "none";
  }
}

function closeTopicsSection() {
  topicsSection.style.display = "none";
  homeSection.style.filter = "blur(0px)";
}

let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let userScore = 0;

const quizData = [
  {
    question:
      "An interface design application that runs in the browser with team-based collaborative design projects ?",
    options: ["FIGMA", "ADOBE XD", "INVISION", "SKETCH"],
    answer: "FIGMA",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "George Orwell", "Jane Austen", "Scott Fitzgerald"],
    answer: "Harper Lee",
  },
  {
    question: "Which of the following is not built-in module in Node-JS",
    options: ["FS", "HTTP", "MYSQL", "PATH"],
    answer: "MYSQL",
  },
  {
    question: "Which type of JavaScript language is",
    options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    answer: "Object-Based",
  },
  {
    question:
      "Which one of the following also known as Conditional Expression:",
    options: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if",
    ],
    answer: "immediate if",
  },
];

function startQuiz() {
  topicsSection.style.display = "none";
  categorySection.style.display = "flex";
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  let questionElement = document.getElementById("question-text");
  questionElement.textContent = currentQuestion.question;

  const optionsContainer = document.querySelector(".options-container");
  optionsContainer.innerHTML = "";

  // Create new options
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    let userAns = (optionElement.textContent = option);
    // console.log("user answer",userAns)

    optionElement.classList.add("option");

    optionElement.onclick = () => {
      selectOption(index + 1, userAns); // Assuming options are 1-based
      console.log("index", index);
      console.log("user answer", userAns);
    };

    optionsContainer.appendChild(optionElement);
  });
}

function selectOption(userIndex, selectedOption) {
  // Highlight the selected option
  const optionsContainer = document.querySelector(".options-container");
  const options = optionsContainer.getElementsByClassName("option");

  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("selected");
  }

  const selectedOptionIndex = userIndex - 1; // Assuming options are 1-based
  options[selectedOptionIndex].classList.add("selected");

  userAnswers.push(selectedOption);
  console.log("arr", userAnswers);
}

function nextQuestion() {
  // Checking if the user has selected an option
  if (userAnswers[currentQuestionIndex] === undefined) {
    alert("Please select an option before moving to the next question.");
    return;
  }

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    calculateScore();
    displayResults();
  }
}
function calculateScore() {
  for (let i = 0; i < quizData.length; i++) {
    if (userAnswers[i] === quizData[i].answer) {
      userScore++;
    }
  }
}

function displayResults() {
  let previousButton = document.getElementById("previous-button");
  let nextButton = document.getElementById("next-button");
  let skipButton = document.getElementById("skip-button");

  previousButton.style.display = "none";
  nextButton.style.display = "none";
  skipButton.style.display = "none";

  let resultsElement = document.getElementById("results-container");
  resultsElement.classList.add("results-container");
  resultsElement.style.display =
    resultsElement.style.display === "none" ||
    resultsElement.style.display === ""
      ? "flex"
      : "none";

  resultsElement.innerText = `SCORE: ${userScore}`;
  console.log("Quiz completed! Your score is: " + userScore);
}
