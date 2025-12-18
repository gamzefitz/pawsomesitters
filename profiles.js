const params = new URLSearchParams(window.location.search);
const city = params.get('city');
console.log(city);

// read data from the petsitter.json file
function getPetSitters() {
  let sittersDiv = document.getElementById('sitters');
  fetch('petsitters.json').then( // fetch the petsitters.json file
    response => {
      response.json().then(data => { // when the json promise resolves, then

        if (city) {
            data = data.filter((sitter) => sitter.location == city);
            document.getElementById('profiles-heading').innerHTML = "Petsitters in " + city;
        }

        data.forEach(element => { // loop through each sitter
          // Structure to sitter 
          // <a class="sitter" href="profile.html?id=<id>">
          //     <img class="sitter-image" src="<url>" />
          //     <span class="sitter-name">Ruth Spots</span>
          //     <span class="sitter-description">Hi! I'm Ruth. I have been a dog sitter for 3 years.</span>
          //     <span class="sitter-price">€35 / day</span>
          // </a>
          console.log(element); // console .log them
        //create the heading with selected city


           // create the sitter div
          let sitterA = document.createElement('a');
          sitterA.setAttribute('href', 'profile.html?id=' + element.id);
          sitterA.classList.add('sitter');

          // profile picture
          let profilePic = document.createElement('img');
          profilePic.classList.add('sitter-image');
          profilePic.setAttribute('src', element.image);

          // create the name span
          let sitterName = document.createElement('span');
          sitterName.classList.add('sitter-name');
          sitterName.innerHTML = element.name + " " + element.lname;

          // create the description span
          let sitterDesc = document.createElement('span');
          sitterDesc.classList.add('sitter-description');
          sitterDesc.innerHTML = element.description;

          // create the sitter price
          let sitterPrice = document.createElement('span');
          sitterPrice.classList.add('sitter-price');
          sitterPrice.innerHTML = '€' + element.price + ' / day';

          // append name and description to the sitter div
          sitterA.appendChild(profilePic);
          sitterA.appendChild(sitterName);
          sitterA.appendChild(sitterDesc);
          sitterA.appendChild(sitterPrice);

          // append the new sitter div to the sitters div
          sittersDiv.appendChild(sitterA);
        });
      });
    }
  ).catch(error => console.error('Error:', error));
}

getPetSitters();