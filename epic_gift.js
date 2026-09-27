window.epicGiftV3 = true;
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen");
  const sheet = document.getElementById("sheet");
  const overlay = document.getElementById("overlay");

  const state = { balance: 0, page: "home" };

  if (window.Telegram?.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    Telegram.WebApp.setHeaderColor?.("#18181b");
    Telegram.WebApp.setBackgroundColor?.("#171719");
  }

  function showSheet(title, html) {
    sheet.innerHTML = `
      <div class="sheet-handle"></div>
      <h2 class="sheet-title">${title}</h2>
      ${html}
    `;
    sheet.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  function closeSheet() {
    sheet.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  overlay.onclick = closeSheet;

  function renderHome() {
    state.page = "home";
    screen.innerHTML = `
      <section class="balance-card">
        <div class="balance-copy">
          <span>Your balance</span>
          <div class="balance-value"><b>${state.balance.toFixed(3)}</b><span class="ton">◉</span></div>
        </div>
        <button class="wallet-btn" id="walletBtn"><span>▱</span><b>＋</b></button>
        <div class="avatar"><span></span></div>
      </section>

      <section class="live-section">
        <div class="live-label"><i></i><b>LIVE</b></div>
        <div class="live-strip">
          <div class="live-gift heart">♥</div>
          <div class="live-gift peach">●</div>
          <div class="live-gift sword">╱</div>
          <div class="live-gift star">✦</div>
          <div class="live-gift flower">✿</div>
          <div class="live-gift gem">⬟</div>
        </div>
      </section>

      <section class="mode-grid">
        ${modeButton("contracts","contracts","⇄","Contracts")}
        ${modeButton("upgrade","upgrade","↗","Upgrade")}
        ${modeButton("rocket","rocket","⌁","Rocket")}
        ${modeButton("pvp","pvp","⚔","PvP")}
      </section>

      <section class="boxes">
        <div class="section-title"><h2>Gift Boxes</h2><button id="allBoxes">View all</button></div>
        <div class="box-grid">
          <button class="box-card free24" data-page="free24"><div class="box-art"><span>24</span><b>FREE</b></div><strong>FREE24</strong><small>Every 24 hours</small></button>
          <button class="box-card farm" data-page="farm"><div class="box-art"><span>🎁</span></div><strong>FARM BOX</strong><small>Any gift can drop</small></button>
          <button class="box-card" data-page="shop"><div class="box-art gift-pink">♥</div><strong>Heart Locket</strong><small>Rare collection</small></button>
          <button class="box-card" data-page="shop"><div class="box-art gift-blue">◆</div><strong>Ion Gem</strong><small>Premium gift</small></button>
        </div>
      </section>

      <section class="discover">
        <button class="discover-card" data-page="hub"><span class="play-box">▶</span><div><small>DISCOVER</small><b>Play Hub</b></div><em>›</em></button>
      </section>
    `;
    bindScreen();
  }

  function modeButton(cls, page, icon, title) {
    const label = page === "pvp" ? "BATTLE MODE" : "PLAY MODE";
    return `<button class="mode-card ${cls}" data-page="${page}">
      <span class="mode-icon">${icon}</span>
      <div><small>${label}</small><b>${title}</b></div><em>›</em>
    </button>`;
  }

  function pageShell(title, content) {
    screen.innerHTML = `<div class="page-head"><button class="page-back" id="back">‹</button><span class="page-title">${title}</span></div>${content}`;
    document.getElementById("back").onclick = renderHome;
  }

  function renderMode(type) {
    const data = {
      contracts: ["Contracts","purple","Combine gifts into a new drop.","Safe Mode","Normal Mode","Risky Mode"],
      upgrade: ["Upgrade","green","Choose a target gift and try to upgrade.","Target value","Chance","Inventory"],
      rocket: ["Rocket","blue","Cash out before the rocket stops.","Multiplier","Round","Entry"],
      pvp: ["PvP","gold","Fight for the bank in a quick round.","Prize pool","Players","Fairness"]
    }[type];

    if (!data) return;
    pageShell(data[0], `
      <section class="page-hero ${data[1]}">
        <small>${type === "pvp" ? "BATTLE MODE" : "PLAY MODE"}</small>
        <h1>${data[0]}</h1>
        <p>${data[2]}</p>
      </section>
      <section class="panel">
        <div class="stats">
          <div class="stat"><b>${type === "rocket" ? "1.00×" : type === "pvp" ? "0.20" : type === "upgrade" ? "48%" : "SAFE"}</b><small>${data[3]}</small></div>
          <div class="stat"><b>${type === "rocket" ? "LIVE" : type === "pvp" ? "2" : type === "upgrade" ? "2.4×" : "3"}</b><small>${data[4]}</small></div>
          <div class="stat"><b>${type === "upgrade" ? "0.1" : type === "pvp" ? "FAIR" : type === "rocket" ? "0.1" : "GIFTS"}</b><small>${data[5]}</small></div>
        </div>
        ${type === "pvp" ? `<div class="bets"><button class="bet active">0.1 TON</button><button class="bet">0.5 TON</button><button class="bet">1 TON</button></div>` : ""}
        <button class="primary" id="action">${type === "rocket" ? "START ROUND" : type === "pvp" ? "FIND MATCH" : type === "contracts" ? "SELECT GIFTS" : "CHOOSE TARGET"}</button>
      </section>
      <section class="panel"><p class="muted">Front-end demo only. Real deposits, inventory, payouts and game settlement require a secure backend.</p></section>
    `);
    document.getElementById("action").onclick = () => {
      const b = document.getElementById("action");
      b.textContent = type === "rocket" ? "ROUND RUNNING…" : type === "pvp" ? "SEARCHING…" : "SELECTED";
      setTimeout(() => { if (document.body.contains(b)) b.textContent = type === "pvp" ? "MATCH FOUND" : "DONE"; }, 900);
    };
    document.querySelectorAll(".bet").forEach(x => x.onclick=()=>{document.querySelectorAll(".bet").forEach(y=>y.classList.remove("active"));x.classList.add("active")});
  }

  function renderFree24() {
    pageShell("FREE24", `
      <section class="page-hero">
        <small>DAILY FREE BOX</small><h1>FREE24</h1>
        <p>Free box available once every 24 hours.</p>
      </section>
      <section class="panel">
        <h3>Daily reward</h3>
        <p class="muted">This local demo does not issue a real NFT or balance reward.</p>
        <button class="primary" id="openFree">OPEN FREE24</button>
      </section>
    `);
    document.getElementById("openFree").onclick=()=>showSheet("FREE24 opened",`<div class="panel"><p class="muted">Demo reward opened. Connect a backend before using real rewards.</p></div><button class="primary" id="closeReward">CLOSE</button>`);
    setTimeout(()=>document.getElementById("closeReward")?.addEventListener("click",closeSheet),0);
  }

  function renderFarm() {
    pageShell("Farm Box", `
      <section class="page-hero green"><small>GIFT BOX</small><h1>Farm Box</h1><p>Any Telegram gift can be part of the pool.</p></section>
      <section class="panel">
        <div class="stats"><div class="stat"><b>0.1 TON</b><small>Example price</small></div><div class="stat"><b>ANY</b><small>Gift range</small></div><div class="stat"><b>BOOSTS</b><small>Odds</small></div></div>
        <button class="primary" id="farmOpen">OPEN FARM BOX</button>
      </section>
    `);
    document.getElementById("farmOpen").onclick=()=>showSheet("Farm Box",`<p class="muted">Demo opening. Payment and gift delivery are intentionally not connected.</p><button class="primary" id="farmClose">OK</button>`);
    setTimeout(()=>document.getElementById("farmClose")?.addEventListener("click",closeSheet),0);
  }

  function renderHub() {
    pageShell("Play Hub", `<div class="list">
      ${["Rocket","PvP","Mines","Plinko","Contracts","Upgrade"].map(x=>`<button class="row hub-row" data-hub="${x.toLowerCase()}"><span>${x}</span><b>›</b></button>`).join("")}
    </div>`);
    document.querySelectorAll(".hub-row").forEach(b=>b.onclick=()=>{
      const map={rocket:"rocket",pvp:"pvp",contracts:"contracts",upgrade:"upgrade"};
      if(map[b.dataset.hub]) renderMode(map[b.dataset.hub]);
      else showSheet(b.textContent.trim(),"Demo mode");
    });
  }

  function renderShop() {
    pageShell("Gift Shop", `<div class="shop-grid">
      ${[
        ["Heart Locket","♥","3.84 TON","gift-pink"],
        ["Bonded Ring","○","2.71 TON","gift-blue"],
        ["Durov's Cap","⌂","8.42 TON","gift-pink"],
        ["Ion Gem","◆","12.60 TON","gift-blue"]
      ].map(g=>`<button class="shop-item"><div class="shop-art ${g[3]}">${g[1]}</div><b>${g[0]}</b><small>${g[2]}</small></button>`).join("")}
    </div>`);
  }

  function renderList(title, rows) {
    pageShell(title, `<div class="list">${rows.map(r=>`<div class="row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>`);
  }

  function bindScreen() {
    document.querySelectorAll("[data-page]").forEach(btn => btn.onclick = () => openPage(btn.dataset.page));
    document.getElementById("walletBtn")?.addEventListener("click",()=>showSheet("Wallet",`
      <div class="sheet-grid">
        <button class="sheet-btn" id="deposit">Deposit TON</button>
        <button class="sheet-btn" id="giftDeposit">Deposit Gifts</button>
      </div>
    `));
    document.getElementById("allBoxes")?.addEventListener("click",()=>renderShop());
  }

  function openPage(page) {
    if(page==="home") return renderHome();
    if(["contracts","upgrade","rocket","pvp"].includes(page)) return renderMode(page);
    if(page==="free24") return renderFree24();
    if(page==="farm") return renderFarm();
    if(page==="hub") return renderHub();
    if(page==="shop") return renderShop();
  }

  document.querySelectorAll("[data-nav]").forEach(btn => btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-nav]").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const n=btn.dataset.nav;
    if(n==="home") return renderHome();
    if(n==="backpack") return renderList("Backpack",[["No gifts yet","—"],["Open some boxes","→"]]);
    if(n==="invite") return renderList("Invite",[["Referral link","COPY"],["Friends","0"],["Reward","10%"]]);
    if(n==="leaderboard") return renderList("Leaderboard",[["1. Player","Durov's Cap"],["2. Player","Precious Peach"],["3. Player","Ion Gem"],["4. Player","Bonded Ring"]]);
    if(n==="earn") return renderList("Earn",[["Daily check-in","+100"],["Play Hub","+300"],["Invite a friend","+250"],["Open a box","+500"]]);
  }));

  document.getElementById("menuBtn").onclick=()=>showSheet("Menu",`
    <div class="sheet-grid">
      <button class="sheet-btn">Profile</button>
      <button class="sheet-btn">Settings</button>
      <button class="sheet-btn">Support</button>
    </div>
  `);

  document.getElementById("closeBtn").onclick=()=>window.Telegram?.WebApp?.close();

  renderHome();

  setInterval(()=>{
    const strip=document.querySelector(".live-strip");
    if(strip?.firstElementChild) strip.appendChild(strip.firstElementChild);
  },2200);
});
