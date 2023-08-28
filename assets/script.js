


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
var score = 0;
var streak = 0;

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
    if (currentIndex === questions.length) {// This will stop the questions from populating once they reach their max length
        gameOver();
        return;
    }

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

    console.log("Selected Answer:", selectedAnswer);
    console.log("Correct Answer:", questions[currentIndex].correctAns);

    if (selectedAnswer == questions[currentIndex].correctAns) {
        console.log(streak)
        score += 5 + Math.ceil(streak / 5);
        console.log(streak)
        streak++;
        //can I put a streak bonus here?
    } else {
        score -= 1;//deduct 2 points
        count -= 5;//deduct 5 seconds for incorrect answer    
        streak= 0; 
    }
    currentIndex++; //go to next question
    if (currentIndex === questions.length) {
        gameOver();
    } else {
       //!!!this streak functionality isn't working.!!! 
        document.getElementById("streakText").style.display = "";
        const streakText = document.getElementById("streakText");
        streakText.innerHTML = "Current Streak: " + streak;
        displayQuestions();
    }
    console.log(score);
    console.log(Math.ceil(streak / 5));
};

document.getElementById("startButton").addEventListener("click", function() {
    console.log(score);
    console.log(streak);
    // Hide the start button/instructions
    document.getElementById("startButton").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("highScoreLink").innerHTML = "";
    // Show the questions
    document.getElementById("questionPopup").style.display = "flex";
    // start at first and cycle through the questions 
    displayQuestions();
    //start the timer
    timer = setInterval(function() {
        document.getElementById("timer").innerHTML = "Time left: " + count--;
        if(count <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
});

function gameOver () {
    // Handle score storage and initials input here
    clearInterval(timer);
    console.log(score);
    document.getElementById("questionPopup").style.display = "none";
    document.getElementById("highScoreEntry").style.display = "flex";
    document.getElementById("returnButton").style.display = "block";

    const scoreElement = document.getElementById("playerScore");
    scoreElement.textContent = score;

    const submitButton = document.getElementById("submitInitials");
    submitButton.addEventListener("click", function() {
        const playerInitials = document.getElementById("initials").value;
        if (playerInitials) {
            const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
            highscores.push({ initials: playerInitials, score: score });
            localStorage.setItem("highscores", JSON.stringify(highscores));
            
        }
        // Clear input and hide highScoreEntry after submitting
        currentIndex = 0;
        score = 0;
        count = 60;
        streak = 0;
        console.log(score)
        document.getElementById("initials").value = "";
        document.getElementById("highScoreEntry").style.display = "none";
        document.getElementById("returnButton").style.display = "none";
        document.getElementById("startButton").style.display = "";
        document.getElementById("instructions").style.display = "";
        document.getElementById("highScoreLink").innerHTML = "View High Scores";
    });
    
    // document.getElementById("timer").innerHTML = "Time left: "
    
    // setTimeout (() => {
    //     const playerInitials = prompt("Please enter your initials to save your highscore:");
    //         if (playerInitials) {
    //             const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    //             highscores.push({ initials: playerInitials, score: score });
    //             localStorage.setItem("highscores", JSON.stringify(highscores));
        
    //     }
    // }, 
    
    //     // Reset the score, and index
        
    
     
};


document.getElementById("highScoreLink").addEventListener("click", function() {
    document.getElementById("viewHighScores").style.display = "block";
    document.getElementById("returnButton").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("instructions").style.display = "none";

    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.sort((a, b) => b.score - a.score);

    const highscoreList = document.getElementById("highScoreList");
    highscoreList.innerHTML = ""; 

    highscores.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
        highscoreList.appendChild(listItem);
    });

})

document.getElementById("returnButton").addEventListener("click", function() {
    document.getElementById("viewHighScores").style.display = "none";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("highScoreEntry").style.display = "none";
    document.getElementById("highScoreLink").innerHTML = "View High Scores";
    document.getElementById("startButton").style.display = "";
    document.getElementById("instructions").style.display = "";
        currentIndex = 0;
        streak = 0;
        score = 0;
        count = 60;
})

// count, timer = setInterval(function() {
//     document.getElementById("timer").innerHTML = "Time left: " + count--;
//     if(count == 0) clearInterval(timer) 
// }, 1000);