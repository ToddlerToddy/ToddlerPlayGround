const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progresstext = document.getElementById('progresstext');
const scoretext = document.getElementById('score');
const progressbarfull= document.getElementById("progressbarfull");

let currentquestion = {};
let acceptingAnswers = false;
let score = 0;
let counter = 0;
let availablequestions =[];


let questions = [
    {
        question: "Which one of the following is not an input device?",
        choice1: "Joystick",
        choice2: "Mouse",
        choice3: "Keyboard",
        choice4: "Printer",
        
        answer: 4
    },

    {
        question: " Find the odd one out?",
        choice1: "MS-Word",
        choice2: "Windows XP",
        choice3: "Linux",
        choice4: "DOS",
        
        answer: 1
    },

    {
        question: "The two kinds of main memory are?",
        choice1: "Primary and secondary",
        choice2: "Random and sequential",
        choice3: "ROM and RAM",
        choice4: "All of above",
        
        answer: 3
    },

    {
        question: "Which of the following is not an input device?",
        choice1: "OCR",
        choice2: "Optical scanners",
        choice3: "Voice recognition device",
        choice4: "COM (Computer Output to Microfilm)",
        
        answer: 4
    },

    {
        question: " A computer consists of?",
        choice1: "A central processing unit",
        choice2: "A memory",
        choice3: "Input and output unit",
        choice4: "All of above",
        
        answer: 4
    },

    {
        question: "All of the following are examples of input devices EXCEPT a?",
        choice1: "scanner",
        choice2: "mouse",
        choice3: "keyboard",
        choice4: "printer",
        
        answer: 4
    },

    {
        question: "Word processing, spreadsheet, and photo-editing are examples of?",
        choice1: "application software",
        choice2: "system software",
        choice3: "operating system software",
        choice4: "platform software",
        
        answer: 1
    },

    {
        question: "Which of the following is the correct order of the four major functions of a computer?",
        choice1: "Process - Output - Input - Storage",
        choice2: "Input - Output - Process - Storage",
        choice3: "Process - Storage - Input - Output",
        choice4: "Input - Process - Output - Storage",
        
        answer: 4
    },

    {
        question: " _______ bits equal one byte?",
        choice1: "Eight",
        choice2: "Two",
        choice3: "One thousand",
        choice4: "One million",
        
        answer: 1
    },

    {
        question: "The two broad categories of software are?",
        choice1: "word processing and spreadsheet",
        choice2: "transaction and application",
        choice3: "Windows and Mac OS",
        choice4: "system and applicationno",
        
        answer: 4
    },

    {
        question: "Who was known as The Father of Computing?",
        choice1: "Steve Jobs",
        choice2: "Mark Zuckerberg",
        choice3: " Charles Babbage",
        choice4: "Jeff Bezos",
        
        answer: 3
    }
];

const correct_bonus = 10;
const max_questions = 5
 
startgame = () => {

    counter = 0;
    score = 0;
    availablequestions = [...questions];
    getnew();
};

getnew = () => {
    if (availablequestions.length === 0 || counter >= max_questions) {
        localStorage.setItem('mostrecentscore', score);
        return window.location.assign("end.html");
      }

    counter++;
    
    progresstext.innerText = 'Question ' + counter + '/' + max_questions;
    const x = (counter/max_questions)*100;
    progressbarfull.style.width = x + "%";

    const questionindex = Math.floor(Math.random() * availablequestions.length);
    currentquestion = availablequestions[questionindex];
    question.innerText = currentquestion.question;
    

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentquestion["choice" + number];
    });

    availablequestions.splice(questionindex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedanswer = selectedchoice.dataset['number'];
        
        const classtoapply  = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect' ;

        if(classtoapply === 'correct')
        {
            incrementscore(correct_bonus);
        }

        selectedchoice.parentElement.classList.add(classtoapply);

        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classtoapply);
            getnew();
        }, 1000);
    });
});

incrementscore = num => {
    score += num;
    scoretext.innerText = score;
};

startgame();
