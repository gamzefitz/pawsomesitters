function readBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings"));

    const bookingsTableBody = document.getElementById("bookings");

    bookings.forEach(element => {
        console.log(element);
        // create layout
        let tableRow = document.createElement("tr");

        // let sitterId = document.createElement("td");
        // sitterId.textContent = element.sitterId;

        let sitterName = document.createElement("td");
        sitterName.textContent = element.sitterName;

        let startDate = document.createElement("td");
        startDate.textContent = element.startDate;

        let endDate = document.createElement("td");
        endDate.textContent = element.endDate;

        let days = document.createElement("td");
        days.textContent = element.days;

        let totalPrice = document.createElement("td");
        totalPrice.textContent = element.totalPrice;

        // tableRow.appendChild(sitterId);
        tableRow.appendChild(sitterName);
        tableRow.appendChild(startDate);
        tableRow.appendChild(endDate);
        tableRow.appendChild(days);
        tableRow.appendChild(totalPrice);

        bookingsTableBody.append(tableRow);
    });
}

readBookings();