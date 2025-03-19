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
if (player2 === "BYE") {
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

    let players = JSON.parse(localStorage.getItem("players")) || [];
    players = players.filter(p => p !== player1 && p !== player2);
    players.push(winner);
    localStorage.setItem("players", JSON.stringify(players));

    currentMatchIndex++;
    localStorage.setItem("currentMatchIndex", currentMatchIndex.toString());

    if (currentMatchIndex < matches.length) {
        location.reload();
    } else {
        window.location.href = "bracket.html";
    }
}

