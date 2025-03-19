let players = JSON.parse(localStorage.getItem("players"));
let matches = createMatchups(players);

function createMatchups(playerList) {
    let shuffled = [...playerList].sort(() => Math.random() - 0.5);
    let matchList = [];

    for (let i = 0; i < shuffled.length; i += 2) {
        if (i + 1 < shuffled.length) {
            matchList.push([shuffled[i], shuffled[i + 1]]);
        } else {
            matchList.push([shuffled[i], "BYE"]); // Handle odd number of players
        }
    }
    return matchList;
}

function generateRounds(initialMatches) {
    let rounds = [initialMatches]; // First round starts with initial matches
    let currentRound = initialMatches;

    while (currentRound.length > 1) {
        let nextRound = [];
        
        for (let i = 0; i < currentRound.length; i += 2) {
            let winnerPlaceholder = "Winner TBD";
            if (currentRound[i + 1]) {
                nextRound.push([winnerPlaceholder, winnerPlaceholder]); // Next round match
            } else {
                nextRound.push([currentRound[i][0], "BYE"]); // Handle odd players
            }
        }

        rounds.push(nextRound);
        currentRound = nextRound;
    }

    return rounds;
}


function displayBracket() {
    let bracketDiv = document.getElementById("bracketDisplay");

    bracketDiv.classList.add("bracket");

    let rounds = generateRounds(matches);

    rounds.forEach((round, roundIndex) => {
        let roundDiv = document.createElement("div");
        roundDiv.classList.add("round");

        round.forEach((match, matchIndex) => {
            let matchDiv = document.createElement("div");
            matchDiv.classList.add("match");
            matchDiv.innerHTML = `<p>${match[0]} vs ${match[1]}</p>`;
            roundDiv.appendChild(matchDiv);
        });

        bracketDiv.appendChild(roundDiv);
    });
}

function startMatch() {
    localStorage.setItem("matches", JSON.stringify(matches));
    localStorage.setItem("currentMatchIndex", "0");
    window.location.href = "match.html";
}

displayBracket();

