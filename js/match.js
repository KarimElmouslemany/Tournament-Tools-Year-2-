let matches = JSON.parse(localStorage.getItem("matches"));
let currentMatchIndex = parseInt(localStorage.getItem("currentMatchIndex"));
let [player1, player2] = matches[currentMatchIndex];

document.getElementById("matchInfo").innerText = `${player1} vs ${player2}`;

function submitScore() {
    let score1 = parseInt(document.getElementById("score1").value);
    let score2 = parseInt(document.getElementById("score2").value);

    let winner;
    if (player2 === "BYE") {
        winner = player1;
    } else if (score1 > score2) {
        winner = player1;
    } else {
        winner = player2;
    }

    let players = JSON.parse(localStorage.getItem("players"));
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
