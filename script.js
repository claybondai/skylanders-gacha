// Skylanders pools by rarity
const fourStar = ["Jawbreaker", "Bushwhack", "Thunderbolt", "Tuff Luck", "Gusto"];
const threeStar = ["Magna Charge", "Free Ranger", "Rattle Shake", "Hoot Loop", "Blades", "Fist Bump", "Pop Thorn", "Roller Brawl"];
const twoStar = ["Tree Rex", "Bouncer", "Crusher", "Hot Head", "Swarm", "Eye-Brawl"];
const oneStar = [
    "Chop Chop", "Spyro", "Stealth Elf", "Gill Grunt", "Trigger Happy", "Whirlwind", "Drobot", "Stump Smash",
    "Sonic Boom", "Warnado", "Camo", "Sunburn", "Eruptor", "Ignitor", "Flameslinger", "Zap", "Wham-Shell",
    "Prism Break", "Hex", "Cynder", "Ghost Roaster", "Double Trouble", "Bash", "Boomer"
];

// Rarity odds
const odds = [
    { stars: 4, chance: 5, pool: fourStar, color: "red" },
    { stars: 3, chance: 15, pool: threeStar, color: "purple" },
    { stars: 2, chance: 30, pool: twoStar, color: "gold" },
    { stars: 1, chance: 50, pool: oneStar, color: "bronze" }
];

// HTML elements
const pullBtn = document.getElementById("pullBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const resultContainer = document.getElementById("resultContainer");
const historyContainer = document.getElementById("historyContainer");

// Pull cost tracking
let nextCost = parseInt(localStorage.getItem("nextCost")) || 0;

// Display next cost under the pull button
function updateNextCostDisplay() {
    let costDisplay = document.getElementById("nextCostDisplay");
    if (!costDisplay) {
        costDisplay = document.createElement("p");
        costDisplay.id = "nextCostDisplay";
        pullBtn.insertAdjacentElement("afterend", costDisplay);
    }
    costDisplay.textContent = `Next Pull Cost: ${nextCost} gold`;
}
updateNextCostDisplay();

// Load history from localStorage
function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem("pullHistory")) || [];
    historyContainer.innerHTML = "";
    savedHistory.forEach(entry => {
        const div = document.createElement("div");
        div.className = "history-entry";
        div.textContent = entry;
        historyContainer.appendChild(div);
    });
}
loadHistory();

// Save history to localStorage
function saveHistory(entry) {
    const history = JSON.parse(localStorage.getItem("pullHistory")) || [];
    history.unshift(entry);
    localStorage.setItem("pullHistory", JSON.stringify(history));
}

// Clear history + reset pull cost
clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("pullHistory");
    localStorage.setItem("nextCost", 0);
    nextCost = 0;
    updateNextCostDisplay();
    historyContainer.innerHTML = "";
});

// Gacha pull
pullBtn.addEventListener("click", () => {
    const roll = Math.random() * 100;
    let cumulative = 0;
    let chosenRarity;

    for (const rarity of odds) {
        cumulative += rarity.chance;
        if (roll <= cumulative) {
            chosenRarity = rarity;
            break;
        }
    }

    const chosenSkylander = chosenRarity.pool[Math.floor(Math.random() * chosenRarity.pool.length)];

    // Display result with rarity glow
    resultContainer.innerHTML = "";
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.border = `5px s
