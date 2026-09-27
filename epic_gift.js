const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function emoji(){if(window.twemoji) twemoji.parse(document.body,{folder:'svg',ext:'.svg',className:'emoji'});}
function openModal(title,text,icon='✨'){ $('#modalTitle').textContent=title; $('#modalText').textContent=text; $('#modalIcon').textContent=icon; $('#modal').classList.remove('hidden'); emoji(); }
function closeModal(){ $('#modal').classList.add('hidden'); }
$('#modalX').onclick=closeModal; $('#modalOk').onclick=closeModal; $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
$('#closeBtn').onclick=()=>{if(window.Telegram?.WebApp?.close) window.Telegram.WebApp.close(); else openModal('Close','In a normal browser this demo stays open.','👋')};
$('#menuBtn').onclick=()=>openModal('Menu','Demo menu opened. You can use the sections below to navigate.','☰');
$('#dropBtn').onclick=()=>openModal('Epic Gift','Header controls are active in this demo.','🎁');
$('#deposit').onclick=()=>openModal('Deposit','This button is UI-only in this version; no real payment or transfer is performed.','💳');
$('#viewAll').onclick=()=>openModal('Gift Boxes','All gift-box cards are displayed in this demo.','🎁');
$$('[data-box]').forEach(b=>b.onclick=()=>openModal(b.dataset.box,'This gift-box card is interactive UI. No purchase or wagering is performed.','🎁'));
$$('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action; const names={rocket:['Rocket','Rocket section opened in demo mode.','🚀'],pvp:['PvP','PvP screen is represented as a non-transactional demo.','⚡'],hub:['Play Hub','Play Hub navigation opened in demo mode.','🎮'],free24:['FREE24','The 24-hour card is shown as a demo interaction.','💎'],free:['FREE','The free-gift card is shown as a demo interaction.','🎁']}; openModal(...names[a]);});
const pages={home:{title:'',html:''},backpack:{title:'Backpack',html:'<div class="empty-page"><div>🎒</div><h2>Backpack</h2><p>Your demo collection will appear here.</p></div>'},invite:{title:'Invite',html:'<div class="empty-page"><div>👥</div><h2>Invite</h2><p>Invite UI is available in demo mode.</p></div>'},leaderboard:{title:'Leaderboard',html:'<div class="empty-page"><div>🏆</div><h2>Leaderboard</h2><p>Demo leaderboard screen.</p></div>'},p2p:{title:'P2P',html:'<div class="empty-page"><div>⇄</div><h2>P2P</h2><p>This is a non-transactional demo screen.</p></div>'}};
const homeHTML=$('#page').innerHTML;
$$('#nav button').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.page; $$('#nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active'); if(key==='home') $('#page').innerHTML=homeHTML; else $('#page').innerHTML=`<div class="subpage-title">${pages[key].title}</div>${pages[key].html}`; emoji(); window.scrollTo({top:0,behavior:'smooth'});});
emoji();