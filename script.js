function nextStep() {
  let playerCount = document.getElementById("playerCount").value;
  if (playerCount < 2) {
    alert("Please enter at least 2 players.");
    return;
  }

  let nameInputs = document.getElementById("nameInputs");
  nameInputs.innerHTML = ""; // Clear previous inputs

  for (let i = 1; i <= playerCount; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${i} Name`;
    input.id = `player${i}`;
    nameInputs.appendChild(input);
    nameInputs.appendChild(document.createElement("br"));
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("playerNames").style.display = "block";
}

function generateBracket() {
  let players = [];
  let inputs = document.querySelectorAll("#nameInputs input");
  inputs.forEach((input) => {
    if (input.value.trim() !== "") {
      players.push(input.value.trim());
    }
  });

  if (players.length < 2) {
    alert("Enter at least 2 player names.");
    return;
  }

  let bracketDisplay = document.getElementById("bracketDisplay");
  bracketDisplay.innerHTML = "<h3>Matchups</h3>";

  for (let i = 0; i < players.length; i += 2) {
    let match = document.createElement("p");
    match.textContent = `${players[i]} vs ${players[i + 1] || "BYE"}`;
    bracketDisplay.appendChild(match);
  }

  document.getElementById("playerNames").style.display = "none";
  document.getElementById("bracket").style.display = "block";
}
