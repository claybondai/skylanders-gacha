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
    { stars: 1, chance: 50, pool: oneStar, color: "white" }
];

// Elements
const pullBtn = document.getElementById("pullBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const resultContainer = document.getElementById("resultContainer");
const historyContainer = document.getElementById("historyContainer");
const costDisplay = document.getElementById("nextCostDisplay");

// Load cost from storage or start at 0
let nextCost = parseInt(localStorage.getItem("nextCost")) || 0;
updateNextCostDisplay();

function updateNextCostDisplay() {
    costDisplay.textContent = `Next Pull Cost: ${nextCost} gold`;
}

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

function saveHistory(entry) {
    const history = JSON.parse(localStorage.getItem("pullHistory")) || [];
    history.unshift(entry);
    localStorage.setItem("pullHistory", JSON.stringify(history));
}

clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear history and reset the gold cost?")) {
        localStorage.removeItem("pullHistory");
        localStorage.setItem("nextCost", 0);
        nextCost = 0;
        updateNextCostDisplay();
        historyContainer.innerHTML = "";
    }
});

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

    // Display result with pulsing glow
    resultContainer.innerHTML = "";
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.border = `5px solid ${chosenRarity.color}`;
    card.style.boxShadow = `0 0 20px 5px ${chosenRarity.color}`;
    card.textContent = `${chosenRarity.stars}★ ${chosenSkylander}`;

    // Add pulsing animation
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        @keyframes pulseGlow {
            0% { box-shadow: 0 0 15px 3px ${chosenRarity.color}; }
            50% { box-shadow: 0 0 30px 10px ${chosenRarity.color}; }
            100% { box-shadow: 0 0 15px 3px ${chosenRarity.color}; }
        }
    `;
    document.head.appendChild(styleTag);
    card.style.animation = "pulseGlow 1.5s infinite ease-in-out";

    resultContainer.appendChild(card);

    // Save pull
    saveHistory(`${chosenRarity.stars}★ ${chosenSkylander}`);
    loadHistory();

    // Increase cost
    if (nextCost === 0) {
        nextCost = 300;
    } else {
        nextCost += 200;
    }
    localStorage.setItem("nextCost", nextCost);
    updateNextCostDisplay();
});
