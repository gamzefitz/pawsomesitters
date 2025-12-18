const params = new URLSearchParams(window.location.search);
const profileId = Number(params.get("id"));
const start = params.get("start");
const end = params.get("end");
let bookings = [];

readBookings();

// read data from the petsitter.json file
function getPetSitters() {
    if (profileId) {
        fetch('petsitters.json').then( // fetch the petsitters.json file
            response => {
                response.json().then(data => { // when the json promise resolves, then
                    data.forEach(element => { // loop through each sitter
                        console.log(element.id, profileId);
                        // find the sitter we want
                        if (element.id === profileId) {
                            const startDate = new Date(start);
                            const endDate = new Date(end);

                            // Calculate number of days
                            const MILLIS_PAR_DAY = 1000 * 60 * 60 * 24;
                            const days = Math.ceil((endDate - startDate) / MILLIS_PAR_DAY);

                            // Calculate total price
                            const total = days * element.price;

                            // populate page
                            document.getElementById("sitter-name").textContent = element.name + " " + element.lname;
                            document.getElementById("start-date").textContent = start;
                            document.getElementById("end-date").textContent = end;
                            document.getElementById("days").textContent = days;
                            document.getElementById("total-price").textContent = '€' + total.toFixed(2);
                        }
                    });
                });
            }
        ).catch(error => console.error('Error:', error));
    }
}

//function onClickConfirm
function onClickConfirm(){
    var bookingInfo = {
        sitterId: profileId,
        sitterName: document.getElementById("sitter-name").textContent,
        startDate: start,
        endDate: end,
        days: document.getElementById("days").textContent,
        totalPrice: document.getElementById("total-price").textContent
    };

    bookings.push(bookingInfo);
    saveBookings(bookings);

    document.getElementById("checkout-title").textContent = "Purrfect!";
    document.getElementById("checkout-confirm-btn").remove();
    document.getElementById("checkout-cancel-btn").remove();
}

function onClickCancel(){
    window.location.href = 'profile.html?id=' + profileId.toString();
}

getPetSitters();

function readBookings() {
    if (localStorage.getItem("bookings")) {
        bookings = JSON.parse(localStorage.getItem("bookings"));
    }
}

function saveBookings(data) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}