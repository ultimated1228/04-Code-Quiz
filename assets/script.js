


// var myQuestions =[
// {
//     question:"What is 10/2?",
//     answers:[
//     a: '3',
//     b: '5',
//     c: '115',
//     d: '200',
// ]
// }

// ];

// var myBtn = document.createElement("button")
// var currentIndex = 0;

// use a for loop to pull up the question array
// function displayQuestions () {
    
//     for (let i = 0; i < questions[currentIndex].answers.length; i++) {
//         let domEl = questions[i].answers;
//         let headingEl = document.createElement("button");
//         headingEl.textContent = domEl;
//         headingEl.style.color = "#fff"
//         headingEl.onclick = displayAns
//         document.body.appendChild(headingEl)
//     }
// }

// headingEl.style.display = "none"

// function displayAns () {
//     currentIndex++;
//     displayQuestions()
// }

//wrap answers within an array and have answers as a key within the object
var currentIndex = 0; // This will keep track of the current question index
var count = 60; // Initial timer value
var timer; // Declare timer variable

var questions = [
    {
        question: "The first Iron Man movie starring Robert Downie Jr was released in what year?",
        answers: [2006,2005,2008,2010],
        correctAns: 2008
    },
    {
        question: "Who is the twin sibling of Scarlet Witch?",
        answers: ["Luminous","Quicksilver","Dr. Doom","Vision"],
        correctAns: "Quicksilver"
    },
    {
        question: "What is the name of Wonder Woman's mother?",
        answers: ["Antiope","Menalippe","Hippolyta","Thalassa"],
        correctAns: "Hippolyta"
    },
    {
        question: "Which superhero team was formed by Cable to counteract the influence of his villainous clone, Stryfe?",
        answers: ["The New Mutants","X-Force","The Exiles","Sentinels"],
        correctAns: "X-Force"
    },
    {
        question: "Who is the only superhero to hold both Mjolnir and Captain America's shield?",
        answers: ["Superman","Hawkeye","Hulk","Ironman"],
        correctAns: "Hawkeye"
    },
    {
        question: "What superhero often faces off against his brother, Maxmius the Mad?",
        answers: ["Silver Surfer","Thor","Hawkman","Black Bolt"],
        correctAns: "Black Bolt"
    },
    {
        question: 'What cosmic entity in the Marvel Universe is known as the "Devourer of Worlds"?',
        answers: ["Galactus","The Collector","The Beyonder","Nemesis"],
        correctAns: "Galactus"
    },
    {
        question: 'What superhero team was created by Jack Kirby and features characters with "New Gods" mythology?',
        answers: ["The Inhumans","X-Men","The Eternals","Guardians of the Galaxy"],
        correctAns: "The Eternals"
    },
    {
        question: "In DC Comics, which superhero is the protector of the planet Rann and often travels through space with his jetpack and ray gun?",
        answers: ["Adam Strange","Starfire","Hawkman","The Atom"],
        correctAns: "Adam Strange"
    },
    {
        question: "Which superhero's alter ego is a reporter for the Daily Bugle named Ben Urich?",
        answers: ["Spider-Man","Iron Fist","Moon Knight","Daredevil"],
        correctAns: "Daredevil"
    }
]


function displayQuestions() {
    if (currentIndex = questions.length) {// This will stop the questions from populating once they reach their max length
        return;
    }

    // Show the questions
    const questionPopup = document.getElementById("questionPopup");
    questionPopup.style.display = "block"; 

    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("options");

    questionText.textContent = questions[currentIndex].question;

    optionsContainer.innerHTML = "";

    for (let i = 0; i < questions[currentIndex].answers.length; i++) {
        const answer = questions[currentIndex].answers[i];
        const optionButton = document.createElement("button");
        optionButton.textContent = answer;
        optionButton.onclick = () => checkAnswer(answer);
        optionsContainer.appendChild(optionButton);
    }
    
};

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === questions[currentIndex].correctAns) {
        currentIndex++;
        displayQuestions();
    } else {
            count -= 5;//deduct 5 seconds for incorrect answer
            currentIndex++; //go to next question
    }
};

document.getElementById("startButton").addEventListener("click", function() {
    // Hide the start button/instructions
    document.getElementById("alignCenter").style.display = "none";
    // Display first question 
    displayQuestions();
    //start the timer
    timer = setInterval(function() {
        document.getElementById("timer").innerHTML = "Time left: " + count--;
        if(count <= 0) {
            clearInterval(timer);
            // !!need to handle timer expiration here!!
            //do I also need to add a reset to displayQuestions to stop the quiz here and record the score
        }
    }, 1000);
});

// count, timer = setInterval(function() {
//     document.getElementById("timer").innerHTML = "Time left: " + count--;
//     if(count == 0) clearInterval(timer) 
// }, 1000);