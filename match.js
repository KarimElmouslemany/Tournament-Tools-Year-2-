let matches = JSON.parse(localStorage.getItem("matches"));
let currentMatchIndex = parseInt(localStorage.getItem("currentMatchIndex")) || 0;

if (currentMatchIndex >= matches.length) {
    window.location.href = "bracket.html";
}

let [player1, player2] = matches[currentMatchIndex];

document.getElementById("matchInfo").innerText = `${player1} vs ${player2}`;
document.getElementById("player1Label").innerText = player1;
document.getElementById("player2Label").innerText = player2;

// If there’s an automatic progression due to an odd number of players
if (player2 === "'X'") {
    document.getElementById("winner1").checked = true;
    document.getElementById("winner1").disabled = true;
    document.getElementById("winner2").disabled = true;
}

function submitWinner() {
    let winner = document.getElementById("winner1").checked ? player1 : player2;

    if (!document.getElementById("winner1").checked && !document.getElementById("winner2").checked) {
        alert("Please select a winner.");
        return;
    }

    let winners = JSON.parse(localStorage.getItem("roundWinners")) || [];
    winners.push(winner);
    localStorage.setItem("roundWinners", JSON.stringify(winners));

    currentMatchIndex++;
    localStorage.setItem("currentMatchIndex", currentMatchIndex.toString());

    if (currentMatchIndex < matches.length) {
        location.reload();
    } else {
        let remainingPlayers = JSON.parse(localStorage.getItem("roundWinners"));
        
        if (remainingPlayers.length === 1) {
            // Final match played, store the tournament winner
            localStorage.setItem("tournamentWinner", remainingPlayers[0]);
            window.location.href = "bracket.html";
        } else {
            // Move to the next round
            localStorage.setItem("players", JSON.stringify(remainingPlayers));
            localStorage.removeItem("roundWinners"); // Reset for the next round
            localStorage.setItem("currentMatchIndex", "0");
            window.location.href = "bracket.html";
        }
    }
}

function getNextRoundMatchups() {
    let previousRound = JSON.parse(localStorage.getItem("matchups")) || [];
    let nextRound = [];

    for (let i = 0; i < previousRound.length; i += 2) {
        let winner1 = previousRound[i][0]; // First match winner
        let winner2 = previousRound[i + 1] ? previousRound[i + 1][0] : null; // Second match winner

        if (winner2) {
            nextRound.push([winner1, winner2]); // Normal case
        } else {
            nextRound.push([winner1, winner1]); // Should never happen (failsafe)
        }
    }

    localStorage.setItem("matchups", JSON.stringify(nextRound));
    return nextRound;
}



