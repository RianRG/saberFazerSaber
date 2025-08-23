const popup = document.querySelector('main aside.shownReceived');
const question = document.querySelector('main aside.shownForm')
const form = question.querySelector('form')
const questionNumber = form.querySelector('span');
const input = form.querySelector('input');
const questionTitle = form.querySelector('p')
const lett = document.querySelector('main img.let');
const rian = document.querySelector('main img.rian')
const textDialogue = document.querySelector('main .dialogueDiv .dialogue .textDialogue')
const character = document.querySelector('main .dialogueDiv .dialogue img')
const username = textDialogue.querySelector('h4');
const skipButton = textDialogue.querySelector('span');
const paragraph = textDialogue.querySelector('p');
const whiteScreen = document.querySelector('.whiteScreen');
const main = document.querySelector('main');
const swordAudio = new Audio('./src/imgs/swordAudio.mp3');
const secondSwordAudio = new Audio('./src/imgs/secondSwordAudio.mp3');
const soundtrack = document.querySelector('audio')

swordAudio.volume = 0.2
secondSwordAudio.volume = 0.2
soundtrack.volume = 0.06;

// ========================== setup

const charactersSetup = {
  'Netícia': {
    'username': 'aiciteL',
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
  4: {
    'h4': charactersSetup.Lelettering.username,
    'p': 'E o que são essas coisas pelo mundo? Parece que o mundo tá cheio de glitches, AAAAAAAA QUE MONSTRO É ESSE?',
    'src': charactersSetup.Lelettering.src
  },
  5: {
    'h4': charactersSetup.Netícia.username,
    'p': 'Kkkkkkkkk é só um bichinho, sua tonta',
    'src': charactersSetup.Netícia.src
  },
  6: {
    'h4': charactersSetup.Netícia.username,
    'p': 'AAAAAAAAH mas que coisa insuportável, será que essa coisa não tem mãe não?',
    'src': charactersSetup.Netícia.src
  },
  7: {
    'h4': charactersSetup.Lelettering.username,
    'p': 'Ela parece ser poderosa, faz alguma coisaaa, eu to com meeedooo, alguém me tira daquiiiiiii AAAAAAAA Me protege',
    'src': charactersSetup.Lelettering.src
  },
  8: {
    'h4': charactersSetup.Netícia.username,
    'p': 'Sai pra lá, eu já sei que você vai falar pra gente unir nossos poderes e blablablá mas eu dou conta disso sozinha, pode ficar aí assistindo e finge que tá fazendo algo',
    'src': charactersSetup.Netícia.src
  },
  9: {
    'h4': charactersSetup.Lelettering.username,
    'p': 'Mas eu to com medo, eu não vou só ficar em um canto esperando essa coisa vir em mim, por favorrrrrrrrrr',
    'src': charactersSetup.Lelettering.src
  },
  10: {
    'h4': charactersSetup.Netícia.username,
    'p': 'Não, não, não!',
    'src': charactersSetup.Netícia.src
  },
  11: {
    'h4': charactersSetup.Letícia.username,
    'p': 'Isso sempre dá uma dor de cabeça, ainda sinto que to girando um pouco',
    'src': charactersSetup.Letícia.src
  },
  12: {
    'h4': charactersSetup.Letícia.username,
    'p': 'Mas enfim, acho que é só eu confiar em mim e tudo vai fluir do jeito certo',
    'src': charactersSetup.Letícia.src
  }
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
  },
  3: {
    number: '4/12',
    question: 'Ele não parava de pensar em como ela era cat, como ela era gata, como ela era muito _____',
    answer: 'gatta'
  },
  4: {
    number: '5/12',
    question: 'Última linha, último recado...',
    'answer': 'Eu amo você, Lelê'
  },
}

let currentQuestion = +localStorage.getItem('currentQuestion') || 0;

// Variáveis para controle de timeouts
let swordTimeouts = [];
let attackingTimeouts = [];
let dialogueTimeout = null;
let writingTimeoutIds = [];
let endingTimeouts = [];

// Funções utilitárias para limpar timeouts
const clearSwordTimeouts = () => {
  swordTimeouts.forEach(id => clearTimeout(id));
  swordTimeouts = [];
}

const clearAttackingTimeouts = () => {
  attackingTimeouts.forEach(id => clearTimeout(id));
  attackingTimeouts = [];
}

const clearWritingTimeouts = () => {
  writingTimeoutIds.forEach(id => clearTimeout(id));
  writingTimeoutIds = [];
}

const clearEndingTimeouts = () => {
  endingTimeouts.forEach(id => clearTimeout(id));
  endingTimeouts = [];
}

const clearDialogueTimeout = () => {
  if (dialogueTimeout) {
    clearTimeout(dialogueTimeout);
    dialogueTimeout = null;
  }
}

// Função para tocar áudio da espada (corrigida)
const playSwordAudio = () => {
  clearSwordTimeouts();
  
  const firstTimeout = setTimeout(() => {
    swordAudio.currentTime = 0;
    swordAudio.play();
    
    const firstAudioTimeout = setTimeout(() => {
      swordAudio.pause();
      swordAudio.currentTime = 0;
    }, 900);
    swordTimeouts.push(firstAudioTimeout);

    const secondTimeout = setTimeout(() => {
      secondSwordAudio.currentTime = 0;
      secondSwordAudio.play();
      
      const secondAudioTimeout = setTimeout(() => {
        secondSwordAudio.pause();
        secondSwordAudio.currentTime = 0;
      }, 1500);
      swordTimeouts.push(secondAudioTimeout);
    }, 500);
    swordTimeouts.push(secondTimeout);
  }, 200);
  swordTimeouts.push(firstTimeout);
}

// Event listener do popup (corrigido)
popup.addEventListener('click', () => {
  popup.classList.remove('first');
  question.classList.add('question');
});

// Preload das imagens
const attackingGif = './src/imgs/let-attacking.gif';
const idleGif = './src/imgs/let-idle.gif';
const idleVillainGif = './src/imgs/villain.gif';
const villainHitGif = './src/imgs/villain-hit.gif'
const transitionToRian = './src/imgs/transitionToRian.gif';
rian.src = idleVillainGif;

new Image().src = idleGif;
new Image().src = attackingGif;
new Image().src = idleVillainGif;
new Image().src = villainHitGif
new Image().src = transitionToRian;

// Função de animação de ataque (corrigida)
const startAttackingAnimation = () => {
  clearAttackingTimeouts();
  
  const startTimeout = setTimeout(() => {
    question.classList.remove('question');
    lett.src = attackingGif + '?t=' + new Date().getTime();
    rian.src = villainHitGif + '?t=' + new Date().getTime();
    playSwordAudio();
    
    const secondAttackTimeout = setTimeout(() => {
      playSwordAudio();
    }, 2050);
    attackingTimeouts.push(secondAttackTimeout);
  }, 300);
  attackingTimeouts.push(startTimeout);

  const endTimeout = setTimeout(() => {
    lett.src = idleGif + '?t=' + new Date().getTime();
    rian.src = idleVillainGif + '?t=' + new Date().getTime();
    if (questions[currentQuestion]) {
      question.classList.add('question');
    }
  }, 4200);
  attackingTimeouts.push(endTimeout);
}

// Função de animação de escrita (corrigida)
const writingAnimation = async (textHtml) => {
  clearWritingTimeouts();
  skipButton.style.pointerEvents = 'none';
  
  let text = textHtml.textContent;
  textHtml.textContent = '';
  
  return new Promise((resolve) => {
    for (let k = 0; k < text.length; k++) {
      const timeoutId = setTimeout(() => {
        textHtml.textContent += text[k];
        if (k === text.length - 1) {
          skipButton.style.pointerEvents = 'all';
          resolve();
        }
      }, 1 * k); // Aumentei um pouco o delay para melhor legibilidade
      writingTimeoutIds.push(timeoutId);
    }
  });
}

// Configuração inicial dos diálogos (corrigida)
const initializeDialogue = () => {
  if (!dialogues[currentDialogue]) {
    document.querySelector('main .dialogueDiv').style.display = 'none';
    if (questions[currentQuestion]) {
      question.classList.add('question');
    } else {
      console.log('finished');
    }
    lett.style.display = 'block';
    lett.src = `./src/imgs/let-idle.gif`;
    return;
  }

  username.textContent = dialogues[currentDialogue].h4;
  paragraph.textContent = dialogues[currentDialogue].p;
  
  if (dialogues[currentDialogue].h4 === charactersSetup.Letícia.username) {
    paragraph.style.color = 'black';
    username.style.color = 'darkblue';
    skipButton.style.color = 'darkblue';
  }
  
  writingAnimation(paragraph);
  character.src = dialogues[currentDialogue].src;
}

// Event listener do skip button (corrigido)
const handleSkipClick = () => {
  clearDialogueTimeout();
  if(currentDialogue===10){
    whiteScreen.classList.add('shownWhite');
    whiteScreen.querySelector('p').textContent = '';
    let tempP = whiteScreen.querySelector('p').textContent;
    setTimeout(() =>{
      whiteScreen.classList.remove('shownWhite');
      whiteScreen.querySelector('p').textContent = tempP;
        if (!dialogues[currentDialogue + 1]) {
      whiteScreen.classList.add('shownWhite');
      
      dialogueTimeout = setTimeout(() => {
        whiteScreen.classList.remove('shownWhite');
        localStorage.setItem('currentDialogue', currentDialogue + 1);
        document.querySelector('main .dialogueDiv').style.display = 'none';
        lett.style.display = 'block';
        lett.src = `./src/imgs/let-idle.gif`;
        popup.classList.add('first');
      }, 4000);
      return;
    }
    if (dialogues[currentDialogue+1].h4 === charactersSetup.Letícia.username){
      paragraph.style.color = 'black';
      username.style.color = 'darkblue';
      skipButton.style.color = 'darkblue';
      lett.style.display = 'block';
      lett.src = `./src/imgs/let-idle.gif`;
    }
    currentDialogue += 1; // Corrigido: era += 5
    localStorage.setItem('currentDialogue', currentDialogue);
    username.textContent = dialogues[currentDialogue].h4;
    paragraph.textContent = dialogues[currentDialogue].p;
    writingAnimation(paragraph);
    character.src = dialogues[currentDialogue].src;
  }, 4000)
  } else{
       if (!dialogues[currentDialogue + 1]) {
      whiteScreen.classList.add('shownWhite');
      whiteScreen.querySelector('p').textContent = 'Respira e concentra, Lelê!'
      dialogueTimeout = setTimeout(() => {
        whiteScreen.classList.remove('shownWhite');
        localStorage.setItem('currentDialogue', currentDialogue + 1);
        document.querySelector('main .dialogueDiv').style.display = 'none';
        lett.style.display = 'block';
        lett.src = `./src/imgs/let-idle.gif`;
        popup.classList.add('first');
      }, 4000);
      return;
    }
    if (dialogues[currentDialogue].h4 === charactersSetup.Letícia.username){
      
      paragraph.style.color = 'black';
      username.style.color = 'darkblue';
      skipButton.style.color = 'darkblue';
    }
    currentDialogue += 1; // Corrigido: era += 5
    localStorage.setItem('currentDialogue', currentDialogue);
    username.textContent = dialogues[currentDialogue].h4;
    paragraph.textContent = dialogues[currentDialogue].p;
    writingAnimation(paragraph);
    character.src = dialogues[currentDialogue].src;
  }
}

// Configuração do diálogo
initializeDialogue();
skipButton.addEventListener('click', handleSkipClick);

// Configuração inicial das perguntas
if (questions[currentQuestion]) {
  questionNumber.textContent = questions[currentQuestion].number;
  questionTitle.textContent = questions[currentQuestion].question;
} else {
  document.querySelector('main .shownForm').style.display = 'none';
  question.classList.remove('question');
}

// Event listener do formulário (corrigido)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (input.value.toString().trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
    input.disabled = true;
    startAttackingAnimation();
    
    if (!questions[currentQuestion + 1]) {
      localStorage.setItem('currentQuestion', currentQuestion + 1);
      question.classList.remove('question');
      
      const hideQuestionTimeout = setTimeout(() => {
        question.style.display = 'none';
      }, 450);
      endingTimeouts.push(hideQuestionTimeout);

      setTimeout(() =>{
        rian.src = transitionToRian + '?t=' + new Date().getTime();
      }, 4200)

      setTimeout(() =>{
          whiteScreen.classList.add('shownWhite');
        whiteScreen.querySelector('p').textContent = 'Viu? Quando você confia em você mesma, tudo dá certo!';
        rian.style.display = 'none'
        
        const endSequenceTimeout1 = setTimeout(() => {
          whiteScreen.classList.remove('shownWhite');
          main.style.backgroundImage = "url('./src/imgs/backgroundAfterfight.gif')";
          lett.style.display = 'none';
          
          const endSequenceTimeout2 = setTimeout(() => {
            main.style.backgroundImage = "url('./src/imgs/transitionBackground.gif')";
            
            const endSequenceTimeout3 = setTimeout(() => {
              whiteScreen.classList.add('shownWhite');
              whiteScreen.style.backgroundColor = 'transparent';
              whiteScreen.querySelector('p').innerHTML = `
                1 ano de história... <br><br> 
                Primeiro ano de RL e eu só queria dizer que eu amo você, amo seu jeito e tudo que você transmite <br><br> 
                Fim da 1.º Temporada <br><br> 

                X linhas de html
                <br>
                X linhas de css
                <br>
                X linhas de javascript
                <br>
                Muitas linhas da nossa história pela frente!
                <br><br>
                Créditos: Rian Gomes, Letícia Rangel
              `;
              localStorage.setItem('onEnd', 1);
              whiteScreen.querySelector('p').style.marginBottom = '900px';
            }, 6500);
            endingTimeouts.push(endSequenceTimeout3);
          }, 6300);
          endingTimeouts.push(endSequenceTimeout2);
        }, 6000);
        endingTimeouts.push(endSequenceTimeout1);
        
        return;
      }, 9000)
    }
    
    currentQuestion++;
    localStorage.setItem('currentQuestion', currentQuestion);
    
    const updateQuestionTimeout = setTimeout(() => {
      questionNumber.textContent = questions[currentQuestion].number;
      questionTitle.textContent = questions[currentQuestion].question;
      input.value = '';
    }, 450);
    attackingTimeouts.push(updateQuestionTimeout);
    input.disabled=false;
  } else {
    document.querySelector('main .shownForm').classList.add('shake');
    
    const removeShakeTimeout = setTimeout(() => {
      document.querySelector('main .shownForm').classList.remove('shake');
    }, 300);
    // Não precisa armazenar este timeout pois é muito curto
  }
});

// Função para limpar todos os timeouts (útil para debugging)
window.clearAllTimeouts = () => {
  clearSwordTimeouts();
  clearAttackingTimeouts();
  clearWritingTimeouts();
  clearEndingTimeouts();
  clearDialogueTimeout();
}