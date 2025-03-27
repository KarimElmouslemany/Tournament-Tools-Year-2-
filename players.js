let numPlayers = localStorage.getItem("numPlayers");
let players = Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`);

function updatePlayerList() {
    let list = document.getElementById("playerList");
    list.innerHTML = "";
    players.forEach((name, index) => {
        list.innerHTML += `<input type="text" value="${name}" id="player-${index}"><br>`;
    });
}

function addPlayer() {
    players.push(`Player ${players.length + 1}`);
    updatePlayerList();
}

function removePlayer() {
    if (players.length > 2) {
        players.pop();
        updatePlayerList();
    } else {
        alert("At least 2 players required!");
    }
}

function savePlayers() {
    players = players.map((_, i) => document.getElementById(`player-${i}`).value);
    localStorage.setItem("players", JSON.stringify(players));
    window.location.href = "bracket.html";
}

updatePlayerList();
