let players = JSON.parse(localStorage.getItem("players"));
let matches;

// Check if matches are already stored (persist across reloads)
let storedMatches = localStorage.getItem("matches");
if (storedMatches) {
    matches = JSON.parse(storedMatches);
} else {
    matches = createMatchups(players);
    localStorage.setItem("matches", JSON.stringify(matches));
}

// Generate ordered matchups (no shuffling)
function createMatchups(playerList) {
    let matchList = [];
    for (let i = 0; i < playerList.length; i += 2) {
        if (i + 1 < playerList.length) {
            matchList.push([playerList[i], playerList[i + 1]]);
        } else {
            matchList.push([playerList[i], "'X'"]); // Handle odd players
        }
    }
    return matchList;
}

// Generate all rounds of the bracket (for display)
function generateRounds(initialMatches) {
    let rounds = [initialMatches];
    let currentRound = initialMatches;
    let matchCounter = 1; // Track match numbers globally

    // Label initial matches (Round 1)
    initialMatches.forEach((match, index) => {
        match.matchNumber = matchCounter++;
    });

    while (currentRound.length > 1) {
        let nextRound = [];
        
        for (let i = 0; i < currentRound.length; i += 2) {
            let match1 = currentRound[i];
            let match2 = currentRound[i + 1];

            // Handle automatic advancement (e.g., Player 7 vs 'X')
            if (match1[1] === "'X'") {
                nextRound.push([match1[0], `Winner of Match ${matchCounter}`]);
            } 
            else if (match2 && match2[1] === "'X'") {
                nextRound.push([`Winner of Match ${matchCounter - 1}`, match2[0]]);
            }
            // Normal case (two winners progressing)
            else if (match2) {
                nextRound.push([
                    `Winner of Match ${matchCounter - 1}`,
                    `Winner of Match ${matchCounter}`
                ]);
            }
            // Final case (odd number of matches)
            else {
                nextRound.push([`Winner of Match ${matchCounter - 1}`, "'X'"]);
            }

            // Assign match numbers to next round
            nextRound[nextRound.length - 1].matchNumber = matchCounter++;
        }

        rounds.push(nextRound);
        currentRound = nextRound;
    }

    return rounds;
}

// Display the bracket on the page
function displayBracket() {
    const bracketDiv = document.getElementById("bracketDisplay");
    bracketDiv.innerHTML = "";

    // Check for tournament winner
    const winner = localStorage.getItem("tournamentWinner");
    if (winner) {
        bracketDiv.innerHTML = `
            <h2>Tournament Winner: ${winner} 🎉</h2>
            <button onclick="restartTournament()">Start New Tournament</button>
        `;
        document.getElementById("startMatchButton").style.display = "none";
        return;
    }

    // Get tournament data
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const storedMatches = localStorage.getItem("matches");
    const matches = storedMatches ? JSON.parse(storedMatches) : createMatchups(players);
    const roundWinners = JSON.parse(localStorage.getItem("roundWinners")) || [];

    // Generate rounds with proper labeling
    const rounds = generateRounds(matches);
    bracketDiv.classList.add("bracket");

    // Display all rounds with proper labeling
    rounds.forEach((round, roundIndex) => {
        const roundDiv = document.createElement("div");
        roundDiv.classList.add("round");

        // Special round names for finals
        let roundTitle;
        if (roundIndex === rounds.length - 1) roundTitle = "Final";
        else if (roundIndex === rounds.length - 2) roundTitle = "Semi-Final";
        else roundTitle = `Round ${roundIndex + 1}`;

        roundDiv.innerHTML = `<h3>${roundTitle}</h3>`;

        round.forEach((match, matchIndex) => {
            const matchDiv = document.createElement("div");
            matchDiv.classList.add("match");

            // Skip displaying "Match 4" if it's just an automatic win
            if (match[1] === "'X'" && roundIndex === 0) {
                return; // Skip displaying this match entirely
            }

            // Add match number if it exists
            if (match.matchNumber) {
                matchDiv.innerHTML += `<h4>Match ${match.matchNumber}</h4>`;
            }

            // Highlight winners from previous rounds
            const isCompleted = roundIndex < rounds.length - 1;
            const winner1 = isCompleted ? roundWinners[match.matchNumber * 2 - 2] : null;
            const winner2 = isCompleted ? roundWinners[match.matchNumber * 2 - 1] : null;

            // Format match display
            let player1Display = winner1 ? `<span class="winner">${winner1}</span>` : match[0];
            let player2Display = winner2 ? `<span class="winner">${winner2}</span>` : match[1];

            // Handle automatic progression
            if (match[1] === "'X'") {
                player2Display = "Winner of Match " + (match.matchNumber + 1);
            }

            matchDiv.innerHTML += `
                <p>${player1Display} vs ${player2Display}</p>
                ${isCompleted ? `<p class="match-winner">Winner: ${roundWinners[match.matchNumber - 1]}</p>` : ""}
            `;

            roundDiv.appendChild(matchDiv);
        });

        bracketDiv.appendChild(roundDiv);
    });

    // Show start button if there are matches left
    const currentMatchIndex = parseInt(localStorage.getItem("currentMatchIndex")) || 0;
    document.getElementById("startMatchButton").style.display = 
        currentMatchIndex < matches.length ? "block" : "none";
}

// Start the first match
function startMatch() {
    localStorage.setItem("currentMatchIndex", "0");
    window.location.href = "match.html";
}

// Reset the tournament
function restartTournament() {
    localStorage.removeItem("matches");
    localStorage.removeItem("roundWinners");
    localStorage.removeItem("tournamentWinner");
    localStorage.removeItem("currentMatchIndex");
    window.location.href = "index.html";
}

// Initialize the bracket when page loads
document.addEventListener("DOMContentLoaded", displayBracket);
