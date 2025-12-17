const params = new URLSearchParams(window.location.search);
const profileId = Number(params.get('id'));

function getPetSitters() {
    if (profileId) {
        fetch('petsitters.json').then( // fetch the petsitters.json file
            response => {
                response.json().then(data => { // when the json promise resolves, then
                    data.forEach(element => { // loop through each sitter
                        // find the sitter we want
                        if (element.id === profileId) {
                            console.log(element);
                            // create layout
                            document.getElementById('profile-name').textContent = "Chat with " + element.name;
                        }
                    });
                });
            }
        ).catch(error => console.error('Error:', error));
    }
}

getPetSitters();

function postMessage() {
  let chatBox = document.getElementById("chats");
  let messageBox = document.getElementById("message");
  let messageText = messageBox.value;
  
  if (messageText) {
    let message = document.createElement("span");
    message.classList.add("you");
    message.classList.add("chat");
    message.innerHTML = messageText;
    chatBox.append(message);
    messageBox.value = "";
  } else {
    console.log("No message");
  }
}

function onClickGoBack(){
    window.location.href = 'profile.html?id=' + profileId.toString();
}