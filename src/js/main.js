const targets = Array.from(document.querySelectorAll('[data-scroll]'));
const span = Array.from(document.querySelectorAll('main ul span'));
const button = document.querySelector('aside form button');
const overAll = document.querySelector('.overall');
const questions = Array.from(document.querySelectorAll('.question'));
const form = document.querySelector('.password');
const input = document.querySelector('input');
const onCapitalLetter = Array.from(document.querySelectorAll('.onCapitalLetter'));

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  if(input.value === 'Lins' || input.value==='Ribossomos') onCapitalLetter[0].classList.add('active')
  else if(input.value==='lins')
    window.location.href='https://youtube.com/shorts/gKEwQId4KVQ?si=eQqgjA9udUUmcAcq'
  else if(input.value==='ribossomos')
    window.location.href='https://youtube.com/shorts/UrAV24D58-U'
})

button.addEventListener('click', (e) =>{
  e.preventDefault();
  overAll.classList.add('active');
  document.body.classList.add('no-scroll');
})


const revealScroll = () =>{
  const windowTop = window.pageYOffset + window.innerHeight * 0.2;
  if(windowTop >= 1500 && windowTop<=2000){
    document.body.style.backgroundColor='#4e2727'
    questions.forEach(question => question.classList.add('shown'))
  } else if(windowTop>=2000){
    document.body.style.backgroundColor='#317e9c'
  } else{
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


const card = document.querySelector('.card');
const png = card.querySelector('.png');
const pngBackground = card.querySelector('.pngBackground')
const pdfForm = card.querySelector('.pdfPassword');
const pdfPassword = pdfForm.querySelector('input');
png.addEventListener('click', () =>{
  png.classList.toggle('animate-png');
  pngBackground.classList.toggle('animate-bg');
  card.classList.toggle('animate-card')
})



pdfForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  if(pdfPassword.value==="gatta")
    window.location.href='https://docs.google.com/document/d/1sr2I3DX2obDa0Cy7o4kRJZOR7FPqFoUVPYyQQFcYTuw/edit?tab=t.0'
  else if(pdfPassword.value==="Gatta")
    onCapitalLetter[1].classList.add('active')
  else
    onCapitalLetter[1].classList.remove('active');
})