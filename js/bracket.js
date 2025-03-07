let players = JSON.parse(localStorage.getItem("players"));
let matches = createMatchups(players);

function createMatchups(playerList) {
    let shuffled = [...playerList].sort(() => Math.random() - 0.5);
    let matchList = [];

    for (let i = 0; i < shuffled.length; i += 2) {
        if (i + 1 < shuffled.length) {
            matchList.push([shuffled[i], shuffled[i + 1]]);
        } else {
            matchList.push([shuffled[i], "BYE"]); // Player gets a bye
        }
    }
    return matchList;
}

function displayBracket() {
    let bracketDiv = document.getElementById("bracketDisplay");
    bracketDiv.innerHTML = "<h3>Matchups</h3>";
    matches.forEach((match, index) => {
        bracketDiv.innerHTML += `<p>Match ${index + 1}: ${match[0]} vs ${match[1]}</p>`;
    });
}

function startMatch() {
    localStorage.setItem("matches", JSON.stringify(matches));
    localStorage.setItem("currentMatchIndex", "0");
    window.location.href = "match.html";
}

displayBracket();
