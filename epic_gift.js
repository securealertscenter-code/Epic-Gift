const tg=window.Telegram?.WebApp; tg?.ready?.(); tg?.expand?.();
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const modal=$('#modal');
function show(title,text,icon='✨'){ $('#modalTitle').textContent=title; $('#modalText').textContent=text; $('#modalIcon').textContent=icon; modal.classList.remove('hidden'); }
function closeModal(){modal.classList.add('hidden')}
$('#modalX').onclick=closeModal; $('#modalOk').onclick=closeModal; modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
$('#closeBtn').onclick=()=>{ if(tg?.close) tg.close(); else show('Close','This demo stays on the page when opened in a normal browser.','👋') };
$('#dropBtn').onclick=()=>show('Account','Your demo balance is stored only in this page.','💳');
$('#menuBtn').onclick=()=>show('Menu','Epic Gift V13 • responsive demo interface','⚙️');
$('#deposit').onclick=()=>show('Deposit','Deposit is UI-only in this build. No real-money transfer is connected.','💎');

let rocketRunning=false;
$('#rocketCard').addEventListener('click',()=>{
 const card=$('#rocketCard'),status=$('#rocketStatus'); if(rocketRunning)return; rocketRunning=true;
 card.classList.remove('crashed'); void card.offsetWidth; card.classList.add('launching'); status.textContent='Launching…';
 let start=1.01, t0=performance.now();
 const tick=now=>{const sec=(now-t0)/1000; const mult=Math.min(6.3,1.01+sec*1.72+sec*sec*.28); status.textContent=`Demo multiplier x${mult.toFixed(2)}`; if(sec<2.7) requestAnimationFrame(tick)}; requestAnimationFrame(tick);
 setTimeout(()=>{card.classList.remove('launching');card.classList.add('crashed');status.textContent='Demo round ended — tap again';rocketRunning=false;},2700);
});
$('#pvpCard').onclick=()=>show('PVP Demo','This screen is a non-transactional visual demo. No betting, deposits or payouts are connected.','⚔️');
$('#hubCard').onclick=()=>show('Play Hub','Upgrade, Plinko and Mines are represented here as UI cards only.','🎮');
$('#free24').onclick=()=>show('FREE24','Daily reward preview. Connect your own backend later if you want a normal, non-monetary reward system.','🏆');
$('#free').onclick=()=>show('FREE','Gift preview opened.','🎁');
$$('.live-card').forEach(b=>b.onclick=()=>show('Live',`${b.dataset.live} card selected.`,'✨'));
$$('.box-card').forEach(b=>b.onclick=()=>show(b.dataset.box,`${b.dataset.box} gift box selected.`,'🎁'));
$('#viewAll').onclick=()=>show('Gift Boxes','All available demo boxes are shown on this page.','📦');

$$('#nav button').forEach(btn=>btn.onclick=()=>{
 $$('#nav button').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
 const p=btn.dataset.page; if(p==='home'){window.scrollTo({top:0,behavior:'smooth'});return}
 const labels={backpack:['Backpack','Your demo inventory will appear here.','🎒'],invite:['Invite','Invite UI is ready for a future referral system.','👥'],leaderboard:['Leaderboard','Leaderboard UI placeholder.','🏆'],p2p:['P2P','P2P is UI-only in this demo; no transfers are enabled.','⇄']}; const [t,tx,i]=labels[p]; show(t,tx,i);
});

// Lightweight interaction polish
$$('button').forEach(b=>b.addEventListener('pointerdown',()=>b.style.transform='scale(.98)')); $$('button').forEach(b=>b.addEventListener('pointerup',()=>b.style.transform=''));
