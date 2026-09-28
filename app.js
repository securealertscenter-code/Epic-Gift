const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const toast = $('#toast');
function show(t){ toast.textContent=t; toast.classList.add('show'); clearTimeout(show.t); show.t=setTimeout(()=>toast.classList.remove('show'),1500); }

// Demo-only balance. No real TON/payment/wagering.
let demoBalance = 12.057;
let selectedAmount = 0.5;
const balanceValue = $('#balanceValue');
function renderBalance(){ balanceValue.textContent = demoBalance.toFixed(3); }

// Live cards
const live = [
  ['🚀','Rocket'],['🎁','Gift'],['◆','Diamond'],['🍀','Lucky'],['⭐','Star'],['💎','Gem']
];
const liveRow = $('#liveRow');
live.forEach(([icon,name])=>{
  const d=document.createElement('button'); d.className='live-item'; d.innerHTML=`<span>${icon}</span><small>${name}</small>`;
  d.onclick=()=>openModal(name, `${name} is a visual demo card.`); liveRow.appendChild(d);
});

// PvP visual cards — demo only
const people=[['🧑‍🚀','CRYPTO','12.7%'],['🤖','DEGEN','7.0%'],['🧑‍🎨','MIKE_K','7.4%']];
const players=$('#players');
people.forEach(([face,name,pct])=>{
  const d=document.createElement('button'); d.className='player';
  d.innerHTML=`<div class="face">${face}</div><small>${name}</small><strong>${pct}</strong>`;
  d.onclick=()=>openModal(name, `${name} • ${pct} — demo profile only.`); players.appendChild(d);
});

// Modal
const modal = $('#modal');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
function openModal(title,text,actions=''){
  modalTitle.textContent=title; modalText.innerHTML=text; $('#modalActions').innerHTML=actions; modal.classList.add('open');
}
function closeModal(){modal.classList.remove('open');}
$('#modalClose').onclick=closeModal;
modal.addEventListener('click',e=>{if(e.target===modal) closeModal()});

// Header actions
$('.deposit').onclick=()=>openModal('Deposit','This is a <b>demo UI</b>. Real TON deposits are not connected.','<button class="primary" data-close>Close</button>');
$('.close').onclick=()=>show('Close is demo-only');
$('.drop').onclick=()=>openModal('Network','TON • Demo network<br><small>UI only — no wallet connection.</small>');
$('.dots').onclick=()=>openModal('Menu','<div class="menu-list"><button data-menu="Profile">Profile</button><button data-menu="Settings">Settings</button><button data-menu="About">About Epic Gift</button></div>');

// Bottom navigation opens actual demo panels
$$('.bottom button').forEach(b=>b.onclick=()=>{
  $$('.bottom button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  const page=b.dataset.page;
  const content={
    backpack:['Backpack','Your demo gifts and collectibles appear here.'],
    invite:['Invite','Invite is a visual demo. No referral payments are connected.'],
    home:['Home','You are on the Home page.'],
    leaderboard:['Leaderboard','Demo leaderboard — no real rankings or rewards.'],
    p2p:['P2P','Demo screen only. No transfers or payments are connected.']
  }[page];
  openModal(content[0],content[1],'<button class="primary" data-close>Close</button>');
});

// Rocket demo controls
const rocketCard=$('.rocket-card');
const rocketLaunch=$('#rocketLaunch');
const demoPanel=$('#demoPanel');
const amountOptions=$$('#amountOptions button');
amountOptions.forEach(btn=>btn.onclick=()=>{
  amountOptions.forEach(x=>x.classList.remove('selected')); btn.classList.add('selected'); selectedAmount=Number(btn.dataset.amount);
  $('#selectedAmount').textContent=selectedAmount.toFixed(selectedAmount<1?1:0)+' Demo';
});
amountOptions[1].classList.add('selected');
$('#selectedAmount').textContent='0.5 Demo';
rocketLaunch.onclick=()=>{
  if(rocketCard.classList.contains('running')) return;
  if(!demoPanel.classList.contains('open')){demoPanel.classList.add('open'); return;}
  if(selectedAmount>demoBalance){show('Not enough demo credits'); return;}
  demoBalance=Number((demoBalance-selectedAmount).toFixed(3)); renderBalance();
  demoPanel.classList.remove('open'); rocketCard.classList.add('running'); rocketLaunch.textContent='Running…';
  const mult=$$('.multipliers b'); let base=1.12, step=0;
  const timer=setInterval(()=>{step++; mult.forEach((el,j)=>el.textContent='x'+(base+step*.43+j*.31).toFixed(2));},220);
  setTimeout(()=>{clearInterval(timer); rocketCard.classList.remove('running'); rocketLaunch.textContent='Launch Demo'; openModal('Rocket Demo Finished',`Demo amount: <b>${selectedAmount}</b><br>Remaining demo balance: <b>${demoBalance.toFixed(3)}</b>`,`<button class="primary" data-close>OK</button>`);},1700);
};

// Other home cards
$('.pvp-card').onclick=()=>openModal('PVP Demo','This section is visual only. No real bets, deposits, or winnings.','<button class="primary" data-close>OK</button>');
$('.hub-card').onclick=()=>openModal('Play Hub','<div class="hub-actions"><button>Upgrade</button><button>Plinko</button><button>Mines</button></div>','');
$$('.small-card').forEach(c=>c.onclick=()=>openModal(c.querySelector('h3').textContent,'Demo reward card — no real reward or transaction is connected.','<button class="primary" data-close>OK</button>'));

// Delegated modal actions
$('#modalActions').addEventListener('click',e=>{
  const close=e.target.closest('[data-close]'); if(close) closeModal();
  const menu=e.target.closest('[data-menu]'); if(menu) { closeModal(); show(menu.dataset.menu); }
});

renderBalance();
