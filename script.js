let messages = JSON.parse(localStorage.getItem("messages")) || [];
let username = localStorage.getItem("username") || "User";

function setUsername() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();

  if (name === "") return;

  username = name;
  localStorage.setItem("username", username);
  input.value = "";
}

function renderMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<span class="username">[${msg.user}]</span> ${msg.text}`;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if (text === "") return;

  messages.push({ user: username, text });
  localStorage.setItem("messages", JSON.stringify(messages));

  input.value = "";
  renderMessages();
}

renderMessages();

// ----------------------
// 1. Firebase Setup
// ----------------------
const firebaseConfig = {
  apiKey: "YOUR-KEY",
  authDomain: "YOUR-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-BUCKET",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ----------------------
// 2. Username Handling
// ----------------------
let username = localStorage.getItem("username") || "User";

function setUsername() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();
  if (name === "") return;

  username = name;
  localStorage.setItem("username", username);
  input.value = "";
}

// ----------------------
// 3. Send Message
// ----------------------
function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (text === "") return;

  db.ref("messages").push({
    user: username,
    text: text
  });

  input.value = "";
}

// ----------------------
// 4. Live Message Listener
// ----------------------
db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  addMessage(msg.user, msg.text);
});

// ----------------------
// 5. Render Messages
// ----------------------
function addMessage(user, text) {
  const box = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<span class="username">[${user}]</span> ${text}`;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
