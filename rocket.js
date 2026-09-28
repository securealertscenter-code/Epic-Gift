const buttons=document.querySelectorAll(".amounts button");
const chosen=document.getElementById("chosen");
const launch=document.getElementById("demoLaunch");
const multiplier=document.getElementById("multiplier");
const status=document.getElementById("gameStatus");
const balanceEl=document.getElementById("currentBalance");
const history=document.getElementById("history");
let selected=50,running=false;

function getPoints(){return Number(localStorage.getItem("epic_points")||"12057");}
function setPoints(value){value=Math.max(0,Math.floor(value));localStorage.setItem("epic_points",String(value));updateBalance();}
function updateBalance(){balanceEl.textContent=getPoints().toLocaleString("fa-IR");}
updateBalance();

buttons.forEach(button=>button.addEventListener("click",()=>{
 if(running)return;
 buttons.forEach(b=>b.classList.remove("selected"));
 button.classList.add("selected");
 selected=Number(button.dataset.a);
 chosen.textContent=selected.toLocaleString("fa-IR")+" امتیاز";
}));

launch.addEventListener("click",()=>{
 if(running)return;
 const balance=getPoints();
 if(selected>balance){
  status.textContent="امتیاز کافی نیست";launch.textContent="امتیاز کافی نیست";
  setTimeout(()=>{status.textContent="آماده شروع";launch.textContent="شروع بازی"},1300);return;
 }
 setPoints(balance-selected);running=true;launch.disabled=true;launch.textContent="در حال اجرا…";status.textContent="بازی در حال اجرا";
 let value=1,ticks=0;
 const timer=setInterval(()=>{
  ticks++;value+=.06+Math.random()*.15;multiplier.textContent=value.toFixed(2)+"x";
  if(ticks>=30){clearInterval(timer);finishGame(Number(value.toFixed(2)));}
 },180);
});

function finishGame(result){
 const reward=Math.floor(selected*Math.min(result,3));
 setPoints(getPoints()+reward);
 const chip=document.createElement("span");chip.textContent=result.toFixed(2)+"x";
 if(result>=3)chip.classList.add("gold");
 history.prepend(chip);
 while(history.children.length>6)history.lastElementChild.remove();
 status.textContent="+"+reward.toLocaleString("fa-IR")+" امتیاز";
 launch.disabled=false;launch.textContent="شروع دوباره";running=false;
 setTimeout(()=>{multiplier.textContent="1.00x";status.textContent="آماده شروع";launch.textContent="شروع بازی"},1800);
}