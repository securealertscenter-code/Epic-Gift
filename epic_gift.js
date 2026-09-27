const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const modal=$('#modal');
function openModal(title,text,icon='✨'){ $('#modalTitle').textContent=title; $('#modalText').textContent=text; $('#modalIcon').textContent=icon; modal.classList.remove('hidden'); }
function closeModal(){modal.classList.add('hidden')}
$('#modalX').onclick=closeModal;$('#modalOk').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
$('#closeBtn').onclick=()=>{if(window.Telegram?.WebApp?.close) window.Telegram.WebApp.close(); else openModal('Epic Gift','This demo is running in a normal browser.','🎁')};
$('#dropBtn').onclick=()=>openModal('Epic Gift','Header controls are active.','🎁');
$('#menuBtn').onclick=()=>openModal('Menu','Navigation and demo controls are active.','☰');
$('#deposit').onclick=()=>openModal('Deposit','UI demo only — no real payment or transfer is performed.','💳');
$('#viewAll').onclick=()=>openModal('Gift Boxes','Gift-box cards are available in the demo interface.','🎁');
$$('[data-box]').forEach(b=>b.onclick=()=>openModal(b.dataset.box,'This card is a visual interaction demo.','🎁'));
const actions={rocket:['Rocket','Rocket interface opened in demo mode.','🚀'],pvp:['PvP','PvP is shown as a non-transactional UI demo.','⚔️'],hub:['Play Hub','Play Hub interface opened in demo mode.','🎮'],free24:['FREE24','FREE24 is a visual demo card.','✨'],free:['FREE','FREE is a visual demo card.','🎁']};
$$('[data-action]').forEach(b=>b.onclick=()=>openModal(...actions[b.dataset.action]));
const homeHTML=$('#page').innerHTML;
const pages={backpack:['Backpack','🎒','Your demo collection appears here.'],invite:['Invite','👥','Invite interface demo.'],leaderboard:['Leaderboard','🏆','Leaderboard interface demo.'],p2p:['P2P','⇄','P2P interface demo — no real transfer is performed.']};
$$('#nav button').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.page;$$('#nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(key==='home')$('#page').innerHTML=homeHTML;else{const [t,i,d]=pages[key];$('#page').innerHTML=`<div style="min-height:65vh;display:grid;place-items:center;text-align:center;color:#b5b7bf;padding:30px"><div><div style="font-size:70px">${i}</div><h2 style="color:#fff">${t}</h2><p>${d}</p></div></div>`}window.scrollTo({top:0,behavior:'smooth'});});
if(window.Telegram?.WebApp){Telegram.WebApp.ready();Telegram.WebApp.expand();}
