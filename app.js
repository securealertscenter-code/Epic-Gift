const live=['🚀','🎁','◆','🍀','⭐','💎'];
const liveRow=document.getElementById('liveRow'); live.forEach(x=>{const d=document.createElement('div');d.className='live-item';d.textContent=x;liveRow.appendChild(d)});
const people=[['🧑‍🚀','12.7%'],['🤖','7.0%'],['🧑‍🎨','7.4%']]; const players=document.getElementById('players'); people.forEach(p=>{const d=document.createElement('div');d.className='player';d.innerHTML=`<div class="face">${p[0]}</div><small>Player</small><strong>${p[1]}</strong>`;players.appendChild(d)});
const toast=document.getElementById('toast');function show(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1300)}
document.querySelector('.deposit').onclick=()=>show('Deposit is demo-only');
document.querySelectorAll('.bottom button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.bottom button').forEach(x=>x.classList.remove('active'));b.classList.add('active');show(b.querySelector('span').textContent)});
setInterval(()=>{document.querySelector('.rocket-card').style.transform='translateY(-1px)';setTimeout(()=>document.querySelector('.rocket-card').style.transform='',180)},1800);
