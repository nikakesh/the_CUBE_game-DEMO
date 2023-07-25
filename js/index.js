const playBt = document.getElementById("playBt");
const upgradeBt = document.getElementById("upgradeBt");
const creditsBt = document.getElementById("creditsBt");
const mainDiv = document.getElementById("main-div")

mainDiv.style.height = `${window.innerHeight-55}px`;

playBt.addEventListener("click", ()=>{
    window.open("./html/game.html", "_parent");
});

upgradeBt.addEventListener("click", ()=>{
  window.open("./html/upgrades.html", "_parent")
});

creditsBt.addEventListener("click", ()=>{
  window.open("./html/credits.html", "_parent")
});