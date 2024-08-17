// script.js

document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim()) {
        appendMessage('User', userInput, 'user-icon');
        document.getElementById('user-input').value = ''; // Clear input field

        // Send the user's message to the server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('Chatbot', data.reply, 'chatbot-icon');
        })
        .catch(error => console.error('Error:', error));
    }
});

function appendMessage(sender, message, iconClass) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender.toLowerCase()}-message`;

    messageElement.innerHTML = `
        <div class="${iconClass}"></div>
        <div class="message-content">${message}</div>
    `;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
