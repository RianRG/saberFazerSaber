const popup = document.querySelector('main aside.shownReceived');
const question = document.querySelector('main aside.shownForm')
const form = question.querySelector('form')
const questionNumber = form.querySelector('span');
const input = form.querySelector('input');
const questionTitle = form.querySelector('p')
const lett = document.querySelector('main img.let');
const textDialogue = document.querySelector('main .dialogueDiv .dialogue .textDialogue')
const character = document.querySelector('main .dialogueDiv .dialogue img')
const username = textDialogue.querySelector('h4');
const skipButton = textDialogue.querySelector('span');
const paragraph = textDialogue.querySelector('p')

const swordAudio = new Audio('./src/imgs/swordAudio.mp3');
const secondSwordAudio = new Audio('./src/imgs/secondSwordAudio.mp3');
const soundtrack = document.querySelector('audio')
swordAudio.volume = 0.2
secondSwordAudio.volume = 0.2
soundtrack.volume = 0.06;


// ========================== setup

const charactersSetup = {
  'Netícia': {
    'username': 'Netícia',
    'src': './src/imgs/dialogue-nett.gif'
  },
  'Lelettering': {
    'username': 'Lelettering',
    'src': './src/imgs/dialogue-lelettering.gif'
  },
  'Letícia': {
    'username': 'Letícia',
    'src': './src/imgs/dialogue-lett.gif'
  }
}

const dialogues = {
  
  0: {
    'h4': charactersSetup.Lelettering.username,
    'p': "AAAAAAAAAHHHHH!! O que aconteceu? Por que o mundo tá tão distorcido? Eu to com meedooo, muuuito medo...",
    'src': charactersSetup.Lelettering.src
  },
  1: {
    'h4': charactersSetup.Netícia.username,
    'p': 'Cala a boquinha, garota, tava sonhando com coxinha e vc me acordou com essa voz de apito insuportável',
    'src': charactersSetup.Netícia.src
  },
  2: {
    'h4': charactersSetup.Netícia.username,
    'p': 'Mas... parando pra pensar... você até que tem razão, to me sentindo meio estranha',
    'src': charactersSetup.Netícia.src
  },
  3: {
    'h4': charactersSetup.Lelettering.username,
    'p': "Eeei! Eu não gostei do jeito que você falou comigo, nós temos que ser amigas sempre para combater o mal JUNTAS!!!",
    'src': charactersSetup.Lelettering.src
  },
  
}
let currentDialogue = +localStorage.getItem('currentDialogue') || 0;  

const questions = {
  0: {
    number: '1/12',
    question: 'Quando os dois pombinhos completaram um mês, o que ele deu para ela?',
    answer: 'nada'
  },
  1: {
    number: '2/12',
    question: 'Ele ficou um tempinho moldando uma obra de arte sobre uma pessoa, até então pouco se sabe sobre ela. Esta obra durou quantos segundos?',
    answer: '25'
  },
  2: {
    number: '3/12',
    question: 'Esse pombinho na verdade tinha outra profissão, ele regava flores. Mas entre tantas flores, uma acabou chamando ele por um nome: "O __________"',
    answer: 'jardineiro'
  }
}

let currentQuestion = +localStorage.getItem('currentQuestion') || 0;


const playSwordAudio = () =>{
  setTimeout(() =>{
    swordAudio.play();
    setTimeout(() =>{
      swordAudio.pause();
      swordAudio.currentTime=0;
    }, 900)

    setTimeout(() =>{
      secondSwordAudio.play();
      setTimeout(() =>{
        secondSwordAudio.pause();
        secondSwordAudio.currentTime=0;
      }, 1500)
    }, 500)
  }, 200)
}


popup.addEventListener('click', () =>{
    popup.classList.remove('first');
    question.classList.add('question')
  
})
const attackingGif = './src/imgs/let-attacking.gif';
const idleGif = './src/imgs/let-idle.gif'

new Image().src = idleGif;
new Image().src = attackingGif


const startAttackingAnimation = () =>{
  setTimeout(() =>{
    question.classList.remove('question')
    lett.src=attackingGif + '?t=' + new Date().getTime();
    playSwordAudio();
    setTimeout(() =>{
      playSwordAudio();
    }, 2050)
  }, 300)

  setTimeout(() =>{
    lett.src= idleGif + '?t=' + new Date().getTime();
    if(questions[currentQuestion]) question.classList.add('question')
  }, 4200)
}
//=========================================== dialogues

const writingAnimation = async (textHtml) =>{
  skipButton.style.pointerEvents='none';
  let text=textHtml.textContent;
  textHtml.textContent='';
  const promise = new Promise((res, rej) =>{
    for (let k=0; k<text.length; ++k){
      setTimeout(() =>{
        textHtml.textContent += text[k]
        if(k==text.length-1) res();
      }, 1*k)
    }
   
  })

  promise.then(() =>{
    skipButton.style.pointerEvents='all';
  })
}

if(!dialogues[currentDialogue]){
  document.querySelector('main .dialogueDiv').style.display='none';
  if(questions[currentQuestion]) question.classList.add('question')
}
else{
username.textContent = dialogues[currentDialogue].h4;
paragraph.textContent = dialogues[currentDialogue].p
writingAnimation(paragraph)

character.src = dialogues[currentDialogue].src
skipButton.addEventListener('click', () =>{
  if(!dialogues[currentDialogue+1]) {
    localStorage.setItem('currentDialogue', currentDialogue+1);
    document.querySelector('main .dialogueDiv').style.display='none';

    popup.classList.add('first')
    return;
  };
  currentDialogue++;
  localStorage.setItem('currentDialogue', currentDialogue);
  username.textContent = dialogues[currentDialogue].h4;
  paragraph.textContent = dialogues[currentDialogue].p
  writingAnimation(paragraph)
  character.src = dialogues[currentDialogue].src
})
}


// ============== questions

popup.addEventListener('click', () =>{
  popup.classList.remove('first');
  question.classList.add('question')
  questionTitle.textContent = questions[0].question
  questionTitle.textContent = questions[0].question
  questionNumber.textContent = questions[0].number
})

questionNumber.textContent = questions[currentQuestion].number
questionTitle.textContent = questions[currentQuestion].question

if(!questions[currentQuestion]){
  document.querySelector('main .shownForm').style.display='none';
  question.classList.remove('question')
}

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  
  
  if(input.value.toString() === questions[currentQuestion].answer){
    startAttackingAnimation();
    if(!questions[currentQuestion+1]){
      localStorage.setItem('currentQuestion', currentQuestion+1);
      question.classList.remove('question')
      setTimeout(() =>{
        question.style.display='none'
      }, 450)
      return;
    }
    currentQuestion++;
    localStorage.setItem('currentQuestion', currentQuestion);
    setTimeout(() =>{
      questionNumber.textContent = questions[currentQuestion].number
      questionTitle.textContent = questions[currentQuestion].question
      input.value=''
    }, 450)
  } else{
    document.querySelector('main .shownForm').classList.add('shake');
    setTimeout(() =>{
    document.querySelector('main .shownForm').classList.remove('shake');
    }, 300)
  }
})