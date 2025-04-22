let matches = JSON.parse(localStorage.getItem("matches"));
let currentMatchIndex = parseInt(localStorage.getItem("currentMatchIndex")) || 0;

// If all matches are done, go back to bracket
if (currentMatchIndex >= matches.length) {
    window.location.href = "bracket.html";
}

let [player1, player2] = matches[currentMatchIndex];

// Display current match
document.getElementById("matchInfo").innerText = `${player1} vs ${player2}`;
document.getElementById("player1Label").innerText = player1;
document.getElementById("player2Label").innerText = player2;

// Auto-win if player2 is a bye ('X')
if (player2 === "'X'") {
    document.getElementById("winner1").checked = true;
    document.getElementById("winner1").disabled = true;
    document.getElementById("winner2").disabled = true;
}

// Submit the winner and advance
function submitWinner() {
    // Validate selection
    if (!document.getElementById("winner1").checked && !document.getElementById("winner2").checked) {
        alert("Please select a winner.");
        return;
    }

    // Determine winner
    let winner = document.getElementById("winner1").checked ? player1 : player2;

    // Store winner for next round
    let winners = JSON.parse(localStorage.getItem("roundWinners")) || [];
    winners.push(winner);
    localStorage.setItem("roundWinners", JSON.stringify(winners));

    // Move to next match
    currentMatchIndex++;
    localStorage.setItem("currentMatchIndex", currentMatchIndex.toString());

    // If all matches are done, proceed to next round or end tournament
    if (currentMatchIndex >= matches.length) {
        let remainingPlayers = JSON.parse(localStorage.getItem("roundWinners"));
        
        if (remainingPlayers.length === 1) {
            // Tournament finished
            localStorage.setItem("tournamentWinner", remainingPlayers[0]);
            window.location.href = "bracket.html";
        } else {
            // Prepare next round
            localStorage.setItem("players", JSON.stringify(remainingPlayers));
            localStorage.removeItem("roundWinners");
            localStorage.removeItem("matches");
            localStorage.setItem("currentMatchIndex", "0");
            window.location.href = "bracket.html";
        }
    } else {
        // Reload for next match
        location.reload();
    }
}

