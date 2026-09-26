document.querySelectorAll('.game').forEach(card=>{
  card.addEventListener('click',()=>{
    card.animate([{transform:'scale(1)'},{transform:'scale(.975)'},{transform:'scale(1)'}],{duration:170,easing:'ease-out'});
    if(card.dataset.game==='rocket'){
      const r=card.querySelector('.rocket-body'), f=card.querySelector('.rocket-flame');
      r.animate([{top:'34px'},{top:'-30px'},{top:'34px'}],{duration:1100,easing:'cubic-bezier(.2,.8,.2,1)'});
      f.animate([{top:'120px'},{top:'56px'},{top:'120px'}],{duration:1100,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
  });
});
