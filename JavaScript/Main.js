// aside media move
document.addEventListener("DOMContentLoaded", function() {
  const aside = document.querySelector('.aside');
  let isHolding = false;
  let startX = null;

  document.addEventListener('mousedown', startAction);
  document.addEventListener('touchstart', startAction);

  document.addEventListener('mouseup', endAction);
  document.addEventListener('touchend', endAction);

  document.addEventListener('mousemove', moveAction);
  document.addEventListener('touchmove', moveAction);

  document.querySelector('.person').addEventListener('click', function() {
    aside.style.left = '-100%';
  });

  function startAction(event) {
    isHolding = true;
    startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  }

  function endAction(event) {
    isHolding = false;
    startX = null;
  }

  function moveAction(event) {
    if (isHolding) {
      const currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
      const movement = currentX - startX;

      if (movement > 50) {
        aside.style.left = '0';
      } else if (movement < -50) {
        aside.style.left = '-100%';
      }
    }
  }
});
// -------------------------------------------
// aside person add
function toggleViewAdd() {
    var add = document.querySelector('.add');
    if (add.style.display === 'none' || add.style.display === '') {
      add.style.display = 'flex';
    } else {
      add.style.display = 'none';
    }
}
function toggleDisplay() {
    var add = document.querySelector('.add');
    add.style.display = 'none';
}

document.getElementById('add-img').addEventListener('change', function(event) {
    var img = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        document.getElementById('add-img-label').style.backgroundImage = 'url(' + e.target.result + ')';
        document.getElementById('add-img-icon').style.display = 'none';
    }
    
    reader.readAsDataURL(img);
});

document.getElementById('add-button').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;
    var fileInput = document.getElementById('add-img');
    
    // Check if name, number, and image are provided
    if (name.trim() === '' || number.trim() === '' || fileInput.files.length === 0) {
        document.querySelector('.error-2').textContent = 'Please fill in all fields';
        return;
    }
    
    var file = fileInput.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var imageUrl = e.target.result;
        
        // Create the chat card element
        var chatCard = document.createElement('div');
        chatCard.classList.add('person', 'flex', 'row', 'center', 'transition');
        
        // Create the image element
        var personImg = document.createElement('div');
        personImg.classList.add('person-img');
        var img = document.createElement('img');
        img.setAttribute('src', imageUrl);
        img.setAttribute('alt', 'Person');
        personImg.appendChild(img);
        
        // Create the person data element
        var personData = document.createElement('div');
        personData.classList.add('person-data', 'flex', 'col');
        var nameElement = document.createElement('p');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        var statusElement = document.createElement('p');
        statusElement.classList.add('statues');
        statusElement.textContent = 'active';
        personData.appendChild(nameElement);
        personData.appendChild(statusElement);
        
        // Create the options element
        var personOptions = document.createElement('div');
        personOptions.classList.add('person-options');
        var button = document.createElement('button');
        button.classList.add('icons');
        var icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-ellipsis-vertical');
        button.appendChild(icon);
        personOptions.appendChild(button);
        
        // Append elements to the chat card
        chatCard.appendChild(personImg);
        chatCard.appendChild(personData);
        chatCard.appendChild(personOptions);
        
        // Append the new chat card to the parent element
        document.getElementById('chats').appendChild(chatCard);
        
        // Reset fields and error message
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';
        document.querySelector('.error-2').textContent = '';
        document.getElementById('add-img-label').style.backgroundImage = 'none';
        document.getElementById('add-img-icon').style.display = 'block';
    }
    
    reader.readAsDataURL(file);
});
// -------------------------------------------
// Send Messages Event
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const fileInput = document.getElementById('file');
const messageBox = document.querySelector('.message-box');
const errorText = document.querySelector('.text.error');

sendButton.addEventListener('click', sendMessage);
fileInput.addEventListener('change', handleFile);
messageInput.addEventListener('keypress', handleKeyPress);

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        appendMessage('message-user', message, time);
        simulateIncomingMessage(); // Simulate incoming message after sending
        messageInput.value = '';
        scrollToBottom();
        errorText.textContent = ''; // Clear error text
    } else {
        errorText.textContent = 'Please enter a message'; // Display error message
    }
}

function simulateIncomingMessage() {
    const receivedMessage = "Good";
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeout(() => {
        appendMessage('message-person', receivedMessage, time);
        scrollToBottom();
    }, 1000); // Simulate a slight delay before receiving message
}

function appendMessage(className, message, time) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className, 'text');
    messageDiv.innerHTML = `
        <div class="the-message">${message}<br><span class="time">${time}</span></div>
    `;
    messageBox.appendChild(messageDiv);
}
// -------------------------------------------
// Simulate receiving messages
setTimeout(() => {
    const receivedMessage = "Hey!!";
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-person', 'text');
    messageDiv.innerHTML = `<div class="the-message">${receivedMessage}</div>`;
    messageBox.appendChild(messageDiv);
    scrollToBottom();
}, 2000);

setTimeout(() => {
    const receivedMessage = "How are you?";
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-person', 'text');
    messageDiv.innerHTML = `<div class="the-message">${receivedMessage}</div>`;
    messageBox.appendChild(messageDiv);
    scrollToBottom();
}, 4500);

// -------------------------------------------
// File Upload Event
function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgSrc = e.target.result;
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('message-img');
                imgDiv.innerHTML = `
                    <img src="${imgSrc}" alt="Image" id="uploadedImage" class="uploaded-image">
                    <br>
                    <span class="time" style="color: #123;">${getTime()}</span>
                `;
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message-user', 'text');
                messageDiv.appendChild(imgDiv);
                messageBox.appendChild(messageDiv);
                scrollToBottom();
            }
            reader.readAsDataURL(file);
            errorText.textContent = ''; // Clear error text
        } else {
            errorText.textContent = 'Please upload an image file'; // Display error message
            fileInput.value = ''; // Clear the input if the file is not an image
        }
    }
}
function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// -------------------------------------------
// Scroll to Bottom & Enter Send Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function scrollToBottom() {
    const scrollOptions = { behavior: 'smooth', block: 'end', inline: 'nearest' };
    messageBox.lastElementChild.scrollIntoView(scrollOptions);
}

// -------------------------------------------
// Image View Event
const toggleButton = document.getElementById('toggleButton');
const displayedImage = document.getElementById('displayedImage');
const view = document.querySelector('.view');

toggleButton.addEventListener('click', toggleView);

function toggleView() {
    if (view.style.display === 'none' || view.style.display === '') {
        view.style.display = 'block';
    } else {
        view.style.display = 'none';
    }
}

document.addEventListener('click', function(event) {
    if (event.target === view || event.target.parentElement === view) {
        return; // Don't close if clicked on view itself or its children
    }
    // Close view if clicked outside image and view
    if (!event.target.closest('img') && view.style.display === 'block') {
        toggleView();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && view.style.display === 'block') {
        toggleView();
    }
});

const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('click', function() {
        displayedImage.src = this.src;
        view.style.display = 'block';
    });
});
// -------------------------------------------