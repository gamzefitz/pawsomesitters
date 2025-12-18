// get id from query params
const params = new URLSearchParams(window.location.search);
const profileId = Number(params.get('id'));

// read data from the petsitter.json file
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
                            document.getElementById('profile-image').src = element.image;
                            document.getElementById('profile-name').textContent = element.name + " " + element.lname;
                            document.getElementById('profile-description').textContent = element.description;
                            document.getElementById("price-per-day").textContent = element.price.toFixed(2);
                            document.getElementById("item1").textContent = element.summaryCard[0];
                            document.getElementById("item2").textContent = element.summaryCard[1];
                            document.getElementById("item3").textContent = element.summaryCard[2];
                        }
                    });
                });
            }
        ).catch(error => console.error('Error:', error));
    }
}

getPetSitters();

const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');
const errorElement = document.getElementById('booking-error');

document.getElementById('book-now').addEventListener("click", () => {
    const startDate = startInput.value;
    const endDate = endInput.value;

    if (!startDate || !endDate) {
        errorElement.textContent = "Please select both a start and end dates.";
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        errorElement.textContent = "End date must be after start date.";
        return;
    }

    errorElement.textContent = "";

    const params = new URLSearchParams({
        id: profileId,
        start: startDate,
        end: endDate
    });

    window.location.href = 'checkout.html?' + params.toString();
});

document.getElementById('start-chat').addEventListener("click", () => {
    const params = new URLSearchParams({
        id: profileId
    });

    window.location.href = 'message.html?' + params.toString();
});