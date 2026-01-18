let fans = JSON.parse(localStorage.getItem("fans")) || [];


document.getElementById("loginForm")?.addEventListener("submit", login);

function login(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  if (!name) return;

  localStorage.setItem("currentFan", name);
  window.location.href = "register.html";
}


function requireLogin() {
  if (!localStorage.getItem("currentFan")) {
    alert("Please log in first.");
    window.location.href = "index.html";
  }
}


function logout() {
  localStorage.removeItem("currentFan");
  alert("Logged out.");
  window.location.href = "index.html";
}


function showUser() {
  const user = localStorage.getItem("currentFan");
  if (user && document.getElementById("welcome")) {
    document.getElementById("welcome").textContent =
      "Welcome, " + user + "!";
  }
}


document.getElementById("fanForm")?.addEventListener("submit", saveFan);

function saveFan(e) {
  e.preventDefault();

  const currentFan = localStorage.getItem("currentFan");

  const exists = fans.some(fan => fan.name === currentFan);
  if (exists) {
    alert("You are already registered.");
    return;
  }

  const fan = {
    name: currentFan,
    player: document.getElementById("player").value,
    competition: document.querySelector('input[name="comp"]:checked').value,
    since: parseInt(document.getElementById("since").value)
  };

  fans.push(fan);
  localStorage.setItem("fans", JSON.stringify(fans));

  alert("Registration successful!");
}


function mostCommon(key) {
  const count = {};
  fans.forEach(f => count[f[key]] = (count[f[key]] || 0) + 1);

  let max = 0, result = "N/A";
  for (let item in count) {
    if (count[item] > max) {
      max = count[item];
      result = item;
    }
  }
  return result;
}