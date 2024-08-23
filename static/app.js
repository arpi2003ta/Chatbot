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

document.getElementById('voice-button').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false;

    recognition.onstart = () => {
        console.log('Voice recognition started. Speak now.');
    };

    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        appendMessage('User', voiceInput, 'user-icon');

        // Send the voice input as a text message to the server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: voiceInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('Chatbot', data.reply, 'chatbot-icon');
        })
        .catch(error => console.error('Error:', error));
    };

    recognition.onerror = (event) => {
        console.error('Voice recognition error', event.error);
    };

    recognition.start();
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
