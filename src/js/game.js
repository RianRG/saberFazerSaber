const popup = document.querySelector('main aside.shown.first');
const question = document.querySelector('main aside.shown.question')
const form = question.querySelector('form')
const lett = document.querySelector('main img.let');
const textDialogue = document.querySelector('main .dialogueDiv .dialogue .textDialogue')
const character = document.querySelector('main .dialogueDiv .dialogue img')
const username = textDialogue.querySelector('h4');
const skipButton = textDialogue.querySelector('span');
const paragraph = textDialogue.querySelector('p')
popup.classList.remove('shown');

const swordAudio = new Audio('./src/imgs/swordAudio.mp3');
const secondSwordAudio = new Audio('./src/imgs/secondSwordAudio.mp3');
const soundtrack = document.querySelector('audio')
swordAudio.volume = 0.2
secondSwordAudio.volume = 0.2
soundtrack.volume = 0.06;
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


// document.addEventListener('click', () =>{
// })
const attackingGif = './src/imgs/let-attacking.gif';
const idleGif = './src/imgs/let-idle.gif'

new Image().src = idleGif;
new Image().src = attackingGif

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  setTimeout(() =>{
    lett.src=attackingGif + '?t=' + new Date().getTime();
    playSwordAudio();
    setTimeout(() =>{
      playSwordAudio();
    }, 2050)
  }, 200)

  setTimeout(() =>{
    lett.src= idleGif + '?t=' + new Date().getTime();
  }, 4000)
})

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
      }, 100*k)
    }
   
  })

  promise.then(() =>{
    skipButton.style.pointerEvents='all';
    console.log('ok')
  })
}

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
  }
  
}
let currentDialogue = localStorage.getItem('currentDialogue') || 0;  

console.log(localStorage.getItem('currentDialogue'))
username.textContent = dialogues[currentDialogue].h4;
paragraph.textContent = dialogues[currentDialogue].p
writingAnimation(paragraph)

character.src = dialogues[currentDialogue].src
skipButton.addEventListener('click', () =>{
  if(dialogues[currentDialogue+1]) currentDialogue++;
  else return;
  localStorage.setItem('currentDialogue', currentDialogue);
  console.log(currentDialogue)
  username.textContent = dialogues[currentDialogue].h4;
  paragraph.textContent = dialogues[currentDialogue].p
  writingAnimation(paragraph)
  character.src = dialogues[currentDialogue].src

})