const targets = Array.from(document.querySelectorAll('[data-scroll]'));
const span = Array.from(document.querySelector('main ul span'));


const revealScroll = () =>{
  const windowTop = window.pageYOffset + window.innerHeight*0.2;

  targets.forEach(target =>{
    const span = target.querySelector('span');

    if(windowTop>target.offsetTop-150){
      target.classList.add('selected');
      span.classList.add('span');
    } else{
      target.classList.remove('selected');
      span.classList.remove('span');
    }
  })
}
revealScroll();
if(targets.length){
  window.addEventListener('scroll', () =>{
    revealScroll();
  })
}