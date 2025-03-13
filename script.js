let players = [];
let currentRound = [];

// Step 1: Move to Player Name Input Section
function nextStep() {
  let playerCount = document.getElementById("playerCount").value;

  if (playerCount < 2 || isNaN(playerCount)) {
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

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("playerNames").classList.remove("hidden");
}

// Step 2: Start Tournament (Generate First Round)
function startTournament() {
  let inputs = document.querySelectorAll("#nameInputs input");
  players = [];

  inputs.forEach((input) => {
    if (input.value.trim() !== "") {
      players.push(input.value.trim());
    }
  });

  if (players.length < 2) {
    alert("Enter at least 2 player names.");
    return;
  }

  document.getElementById("playerNames").classList.add("hidden");
  document.getElementById("bracket").classList.remove("hidden");

  generateMatchups();
}

// Step 3: Generate Matchups
function generateMatchups() {
  let bracketDisplay = document.getElementById("bracketDisplay");
  bracketDisplay.innerHTML = "<h3>Select Winners</h3>";
  currentRound = [];

  for (let i = 0; i < players.length; i += 2) {
    let matchDiv = document.createElement("div");
    matchDiv.classList.add("match");

    let player1 = players[i];
    let player2 = players[i + 1] || "BYE"; // Handle odd number of players

    let input1 = `<input type="radio" name="match${i}" value="${player1}"> <label>${player1}</label>`;
    let input2 =
      player2 !== "BYE"
        ? `<input type="radio" name="match${i}" value="${player2}"> <label>${player2}</label>`
        : "";

    matchDiv.innerHTML = `${input1} ${input2}`;
    bracketDisplay.appendChild(matchDiv);
    currentRound.push({ match: i, player1, player2 });
  }
}

// Step 4: Progress Tournament
function progressTournament() {
  let newRound = [];

  currentRound.forEach(({ match, player1, player2 }) => {
    let selectedWinner = document.querySelector(
      `input[name="match${match}"]:checked`
    );

    if (selectedWinner) {
      newRound.push(selectedWinner.value);
    } else {
      alert("Please select winners for all matches.");
      return;
    }
  });

  players = newRound;

  if (players.length === 1) {
    document.getElementById("bracket").classList.add("hidden");
    document.getElementById("winnerSection").classList.remove("hidden");
    document.getElementById("winnerName").textContent = players[0];
  } else {
    generateMatchups(); // Continue tournament
  }
}

// Step 5: Restart Tournament
function restartTournament() {
  document.getElementById("playerCount").value = "";
  document.getElementById("setup").classList.remove("hidden");
  document.getElementById("playerNames").classList.add("hidden");
  document.getElementById("bracket").classList.add("hidden");
  document.getElementById("winnerSection").classList.add("hidden");
}
