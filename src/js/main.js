const targets = Array.from(document.querySelectorAll('[data-scroll]'));
const span = Array.from(document.querySelectorAll('main ul span'));
const button = document.querySelector('aside form button');
const overAll = document.querySelector('.overall');
const questions = Array.from(document.querySelectorAll('.question'));
button.addEventListener('click', (e) =>{
  e.preventDefault();
  overAll.classList.add('active');
  document.body.classList.add('no-scroll');
})


const revealScroll = () =>{
  const windowTop = window.pageYOffset + window.innerHeight * 0.2;
  if(windowTop >= 1500){
    document.body.style.backgroundColor='#4e2727'
    questions.forEach(question => question.classList.add('shown'))
  }
  else{
    document.body.style.backgroundColor='#91e3ee'
    questions.forEach(question => question.classList.remove('shown'))
  }

  targets.forEach(target =>{
    const span = target.querySelector('span');

    if(windowTop>target.offsetTop -420){
      target.classList.add('selected');
      span.classList.add('span');
    } else{
      target.classList.remove('selected');
      span.classList.remove('span');
    }
  })
}
if(targets.length){
  window.addEventListener('scroll', () =>{
    revealScroll();
  })
}