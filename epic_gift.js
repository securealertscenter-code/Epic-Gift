document.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{b.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:160,easing:'ease-out'})}));
