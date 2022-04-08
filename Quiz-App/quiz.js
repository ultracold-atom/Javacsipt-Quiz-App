class Question{
    constructor(questionText,choices,answer){
        this.questionText = questionText
        this.choices = choices
        this.answer = answer
    }

    checkAnswer=(answer)=>{
      return this.answer === answer
    }  
}


class Quiz{
  constructor(questions){
    this.questions = questions
    this.score = 0
    this.questionIndex = 0
  } 

  getQuestion=()=>{
    return this.questions[this.questionIndex]  
  }

  isFinished=()=>{
    return this.questions.length === this.questionIndex  
  }

  guess = (answer)=>{
    var question = this.getQuestion()
    if(question.checkAnswer(answer)){
      this.score++  
    }
    this.questionIndex++  
  }
}



// Defining Questions
let q1 = new Question("Which is the biggest city in Europe?",["Istanbul","London","Moscow","Rome"],"Istanbul")

let q2 = new Question("Who is the designer of Sputnik?",["Werner von Braun","Sergei Korolev","Hermann Oberth","Tom Mueller"],"Sergei Korolev")

let q3 = new Question("Which field doesn't have Nobel Prize?",["Physics","Chemistry","Math","Literature"],"Math")

var questions = [q1,q2,q3]

//Starting Quiz
var quiz = new Quiz(questions)


//Loading new quesiton

loadQuestion=()=>{
    if(quiz.isFinished()){
        showScore();
    }
    else{
        var question = quiz.getQuestion();
        var choices = question.choices;
        
        document.querySelector('#question').textContent = question.questionText;

        for(var i=0; i<choices.length;i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }
        showProgress();
    }
}

guess=(id,guess)=>{
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion()
    }
}

showScore=()=>{
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
 
    document.querySelector('.card-body').innerHTML = html;
 }
 
showProgress=()=>{
     var totalQuestion = quiz.questions.length;
     var questionNumber = quiz.questionIndex+1;
     var html = 'Question '+ questionNumber + ' of ' + totalQuestion;
 
     if(totalQuestion === questionNumber){
         document.querySelector('#progress').innerHTML = "Quiz is Ended";
     }else{
         document.querySelector('#progress').innerHTML = html;
     }
 }

 loadQuestion();