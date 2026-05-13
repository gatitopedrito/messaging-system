let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if (text === "") return;

  messages.push(text);
  localStorage.setItem("messages", JSON.stringify(messages));

  input.value = "";
  renderMessages();
}

renderMessages();
