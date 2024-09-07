const targets = Array.from(document.querySelectorAll('[data-scroll]'));
const span = Array.from(document.querySelectorAll('main ul span'));
const button = document.querySelector('aside form button');
const overAll = document.querySelector('.overall');
button.addEventListener('click', (e) =>{
  e.preventDefault();
  overAll.classList.add('active');
  document.body.classList.add('no-scroll');
})


const revealScroll = () =>{
  const windowTop = window.pageYOffset + window.innerHeight * 0.2;
  
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