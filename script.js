// Skylander pools
const fourStar = ["Snap Shot", "Bushwhack", "Jawbreaker", "Wildfire", "Gusto"];
const threeStar = [
    "Magna Charge", "Free Ranger", "Rattle Shake", "Hoot Loop",
    "Blades", "Fist Bump", "Pop Thorn", "Roller Brawl"
];
const twoStar = [
    "Tree Rex", "Bouncer", "Crusher", "Hot Head", "Swarm", "Eye-Brawl"
];
const oneStar = [
    "Chop Chop", "Spyro", "Stealth Elf", "Gill Grunt", "Trigger Happy", "Whirlwind",
    "Boomer", "Voodood", "Zap", "Wrecking Ball", "Dino-Rang", "Eruptor",
    "Flameslinger", "Ignitor", "Sunburn", "Warnado", "Wham-Shell", "Hex",
    "Double Trouble", "Prism Break", "Sonic Boom", "Drill Sergeant", "Camouflage",
    "Ghost Roaster"
];

// Rarity odds
const odds = {
    four: 0.05,
    three: 0.15,
    two: 0.30,
    one: 0.50
};

// Load history
let history = JSON.parse(localStorage.getItem("pullHistory")) || [];

const resultContainer = document.getElementById("resultContainer");
const historyContainer = document.getElementById("historyContainer");
const pullBtn = document.getElementById("pullBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Display history on load
updateHistoryDisplay();

pullBtn.addEventListener("click", () => {
    const pulled = pullSkylander();
    showResult(pulled);
    saveToHistory(pulled);
    updateHistoryDisplay();
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    localStorage.removeItem("pullHistory");
    updateHistoryDisplay();
});

function pullSkylander() {
    const roll = Math.random();
    if (roll < odds.four) {
        return { name: randomFrom(fourStar), stars: 4 };
    } else if (roll < odds.four + odds.three) {
        return { name: randomFrom(threeStar), stars: 3 };
    } else if (roll < odds.four + odds.three + odds.two) {
        return { name: randomFrom(twoStar), stars: 2 };
    } else {
        return { name: randomFrom(oneStar), stars: 1 };
    }
}

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function showResult(pull) {
    const glowClasses = {
        4: "red-glow",
        3: "purple-glow",
        2: "gold-glow",
        1: "bronze-glow"
    };

    resultContainer.innerHTML = "";

    const card = document.createElement("div");
    card.className = `skylander-card ${glowClasses[pull.stars]}`;

    // Animation
    card.style.transform = "scale(0)";
    setTimeout(() => {
        card.style.transform = "scale(1)";
        card.style.transition = "transform 0.3s ease";
    }, 10);

    card.innerHTML = `
        <h3>${pull.name}</h3>
        <p>${"★".repeat(pull.stars)}</p>
    `;

    resultContainer.appendChild(card);
}

function saveToHistory(pull) {
    history.unshift(pull);
    if (history.length > 50) history.pop();
    localStorage.setItem("pullHistory", JSON.stringify(history));
}

function updateHistoryDisplay() {
    historyContainer.innerHTML = "";
    history.forEach(pull => {
        const item = document.createElement("div");
        item.className = "history-item";
        const colors = { 4: "red", 3: "purple", 2: "gold", 1: "#cd7f32" };
        item.style.color = colors[pull.stars];
        item.textContent = `${pull.name} (${pull.stars}★)`;
        historyContainer.appendChild(item);
    });
}
