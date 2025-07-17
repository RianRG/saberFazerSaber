const popup = document.querySelector('main aside.shown.first');
const question = document.querySelector('main aside.shown.question')
const form = question.querySelector('form')
const lett = document.querySelector('main img.let');
popup.classList.remove('shown');

const swordAudio = new Audio('../../src/imgs/swordAudio.mp3');
const secondSwordAudio = new Audio('../../src/imgs/secondSwordAudio.mp3');
swordAudio.volume = 0.4
secondSwordAudio.volume = 0.4

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
    }, 600)
  }, 300)
}


// document.addEventListener('click', () =>{
// })

const attackingGif = '../../src/imgs/let-attacking.gif';
const idleGif = '../../src/imgs/let-idle.gif'

new Image().src = idleGif;
new Image().src = attackingGif

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  setTimeout(() =>{
    lett.src=attackingGif + '?t=' + new Date().getTime();
    playSwordAudio();
    setTimeout(() =>{
      playSwordAudio();
    }, 1950)
  }, 200)

  setTimeout(() =>{
    lett.src= idleGif + '?t=' + new Date().getTime();
  }, 3900)
})


