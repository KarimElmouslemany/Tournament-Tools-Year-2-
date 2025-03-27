function savePlayerCount() {
    let numPlayers = document.getElementById("numPlayers").value;
    if (numPlayers < 2 || numPlayers > 16) {
        alert("Enter between 2 and 16 players.");
        return;
    }
    localStorage.setItem("numPlayers", numPlayers);
    window.location.href = "players.html";
}

