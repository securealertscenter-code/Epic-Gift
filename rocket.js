const buttons=document.querySelectorAll('.amounts button');
const chosen=document.getElementById('chosen');
const launch=document.getElementById('demoLaunch');
const mult=document.getElementById('multiplier');

let selected=Number(document.querySelector('.amounts button.selected')?.dataset.a || 0.5);

buttons.forEach(b=>b.addEventListener('click',()=>{
  buttons.forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected');
  selected=Number(b.dataset.a);
  chosen.textContent=selected.toFixed(1)+' Demo';
}));

launch.addEventListener('click',()=>{
  const balance=Number(localStorage.getItem('epic_demo_balance') || '12.057');
  if(selected > balance){
    launch.textContent='Not enough demo balance';
    setTimeout(()=>launch.textContent='Start Demo',1200);
    return;
  }

  // Demo-only balance deduction. No real TON/payment is used.
  const next=balance-selected;
  localStorage.setItem('epic_demo_balance',next.toFixed(3));
  const n=1.01+Math.random()*9.8;
  mult.textContent=n.toFixed(2)+'x';
  launch.textContent=`-${selected.toFixed(1)} Demo • Running…`;
  setTimeout(()=>launch.textContent='Start Demo',1200);
});
