function saveData() {
  localStorage.setItem("candidates", JSON.stringify(candidates));
}

// COUNTDOWN TIMER (1 hour)
const savedEnd = localStorage.getItem("endTime");
const endTime = savedEnd ? parseInt(savedEnd) : new Date().getTime() + (60 * 60 * 1000);
localStorage.setItem("endTime", endTime);

function updateTimer() {
  const now = new Date().getTime();
  const distance = endTime - now;

  const timer = document.getElementById("timer");

  if (!timer) return;

  if (distance <= 0) {
    timer.innerText = "Voting Closed";
    return;
  }

  const minutes = Math.floor(distance / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timer.innerText = `Time Remaining: ${minutes}m ${seconds}s`;
}

setInterval(updateTimer, 1000);

// DISPLAY CANDIDATES
if (document.getElementById("candidates")) {
  const container = document.getElementById("candidates");
  container.innerHTML = "";

  candidates.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${c.image}" alt="candidate">
      <h3>${c.name}</h3>
      <button onclick="vote(${c.id})">Vote</button>
    `;

    container.appendChild(div);
  });
}

// VOTING
function vote(id) {
  if (localStorage.getItem("voted")) {
    alert("You have already voted!");
    return;
  }

  candidates = candidates.map(c =>
    c.id === id ? { ...c, votes: c.votes + 1 } : c
  );

  localStorage.setItem("voted", "true");
  saveData();

  alert("Vote submitted!");
}

// RESULTS
if (document.getElementById("results")) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  let totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  let maxVotes = Math.max(...candidates.map(c => c.votes));

  candidates.forEach(c => {
    let percent = totalVotes ? ((c.votes / totalVotes) * 100).toFixed(1) : 0;

    const div = document.createElement("div");
    div.className = "card";

    if (c.votes === maxVotes && totalVotes > 0) {
      div.classList.add("winner");
    }

    div.innerHTML = `
      <img src="${c.image}" alt="candidate">
      <h3>${c.name}</h3>
      <p>Votes: ${c.votes}</p>
      <p>${percent}%</p>
    `;

    container.appendChild(div);
  });
}