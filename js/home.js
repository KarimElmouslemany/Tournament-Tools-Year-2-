function savePlayerCount() {
    let numPlayers = document.getElementById("numPlayers").value;
    if (numPlayers < 2) {
        alert("Enter at least 2 players");
        return;
    }
    localStorage.setItem("numPlayers", numPlayers);
    window.location.href = "players.html";
}
