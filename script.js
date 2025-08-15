const pool4 = ["Snap Shot", "Wallop", "Wildfire", "Blastermind", "Tuff Luck"];
const pool3 = ["Magna Charge", "Wash Buckler", "Hoot Loop", "Doom Stone", "Blades", "Fist Bump", "Pop Thorn", "Roller Brawl"];
const pool2 = ["Tree Rex", "Bouncer", "Crusher", "Ninjini", "Thumpback", "Swarm"];
const pool1 = [
    "Spyro", "Double Trouble", "Pop Fizz",
    "Gill Grunt", "Slam Bam", "Chill",
    "Trigger Happy", "Drobot", "Sprocket",
    "Stealth Elf", "Zook", "Shroomboom",
    "Eruptor", "Flameslinger", "Hot Dog",
    "Terrafin", "Prism Break", "Flashwing",
    "Whirlwind", "Jet-Vac", "Sonic Boom",
    "Chop Chop", "Hex", "Fright Rider"
];

const odds = { "4": 0.05, "3": 0.15, "2": 0.30, "1": 0.50 };
let pityCounter = parseInt(localStorage.getItem("pityCounter") || "0");
let history = JSON.parse(localStorage.getItem("history") || "[]");

function updateHistoryDisplay() {
    const list = document.getElementById("history");
    list.innerHTML = "";
    history.forEach((pull, i) => {
        const li = document.createElement("li");
        li.textContent = `#${i+1}: ${pull.name} (${pull.stars}★)`;
        list.appendChild(li);
    });
    document.getElementById("pityCounter").textContent = `Pity Counter: ${pityCounter}`;
}

function rollPull() {
    let stars;
    if (pityCounter >= 9) {
        stars = Math.random() < (odds["4"] / (odds["4"] + odds["3"])) ? 4 : 3;
    } else {
        const roll = Math.random();
        if (roll < odds["4"]) stars = 4;
        else if (roll < odds["4"] + odds["3"]) stars = 3;
        else if (roll < odds["4"] + odds["3"] + odds["2"]) stars = 2;
        else stars = 1;
    }

    let pool = stars === 4 ? pool4 : stars === 3 ? pool3 : stars === 2 ? pool2 : pool1;
    const character = pool[Math.floor(Math.random() * pool.length)];

    pityCounter = stars >= 3 ? 0 : pityCounter + 1;
    history.push({ name: character, stars });
    localStorage.setItem("pityCounter", pityCounter);
    localStorage.setItem("history", JSON.stringify(history));

    const orb = document.getElementById("orb");
    orb.className = "orb glow-" + stars;
    setTimeout(() => {
        document.getElementById("result").textContent = `${character} (${stars}★)`;
        updateHistoryDisplay();
    }, 700);
}

document.getElementById("pullBtn").addEventListener("click", rollPull);
updateHistoryDisplay();
