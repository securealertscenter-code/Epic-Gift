const live=['🚀','🎁','◆','🍀','⭐','💎'];
const liveRow=document.getElementById('liveRow'); live.forEach(x=>{const d=document.createElement('div');d.className='live-item';d.textContent=x;liveRow.appendChild(d)});
const people=[['🧑‍🚀','12.7%'],['🤖','7.0%'],['🧑‍🎨','7.4%']]; const players=document.getElementById('players'); people.forEach(p=>{const d=document.createElement('div');d.className='player';d.innerHTML=`<div class="face">${p[0]}</div><small>Player</small><strong>${p[1]}</strong>`;players.appendChild(d)});
const toast=document.getElementById('toast');function show(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1300)}
document.querySelector('.deposit').onclick=()=>show('Deposit is demo-only');
document.querySelectorAll('.bottom button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.bottom button').forEach(x=>x.classList.remove('active'));b.classList.add('active');show(b.querySelector('span').textContent)});
setInterval(()=>{document.querySelector('.rocket-card').style.transform='translateY(-1px)';setTimeout(()=>document.querySelector('.rocket-card').style.transform='',180)},1800);


// Demo-only Rocket controls: no real TON, payments, wagers, or withdrawals.
let demoBalance=12.057;
let selectedAmount=0.5;
const balanceValue=document.getElementById('balanceValue');
const rocketCard=document.querySelector('.rocket-card');
const rocketLaunch=document.getElementById('rocketLaunch');
const demoPanel=document.getElementById('demoPanel');
const amountOptions=document.querySelectorAll('#amountOptions button');
function renderBalance(){balanceValue.textContent=demoBalance.toFixed(3)}
amountOptions.forEach(btn=>{btn.onclick=()=>{amountOptions.forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');selectedAmount=Number(btn.dataset.amount);show(`Demo amount: ${selectedAmount} TON`)}});
amountOptions[1].classList.add('selected');
rocketLaunch.onclick=()=>{
  if(!demoPanel.classList.contains('open')){demoPanel.classList.add('open');return}
  if(selectedAmount>demoBalance){show('Not enough demo credits');return}
  demoBalance=Number((demoBalance-selectedAmount).toFixed(3));renderBalance();
  demoPanel.classList.remove('open');rocketCard.classList.add('running');rocketLaunch.textContent='Running…';
  const values=[1.12,1.48,2.05,2.76,3.44]; let i=0;
  const timer=setInterval(()=>{document.querySelectorAll('.multipliers b').forEach((el,j)=>el.textContent='x'+(values[(i+j)%values.length]).toFixed(2));i++;},260);
  setTimeout(()=>{clearInterval(timer);rocketCard.classList.remove('running');rocketLaunch.textContent='Launch Demo';show('Demo round finished');},1800);
};
