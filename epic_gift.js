const closeBtn=document.getElementById('closeBtn');
closeBtn.addEventListener('click',()=>{if(window.Telegram?.WebApp?.close) window.Telegram.WebApp.close(); else document.body.classList.add('closed-demo')});
document.getElementById('deposit').addEventListener('click',()=>alert('Deposit is a front-end demo button.'));
document.getElementById('menuBtn').addEventListener('click',()=>alert('Menu'));
document.querySelectorAll('.bottom-nav button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.bottom-nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}));
