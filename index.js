function getCatFact() {
  let catFact = document.getElementById('cat-fact-id');
  catFact.classList.add('fade-out');
  catFact.classList.remove('fade-in');
  fetch('https://catfact.ninja/fact').then(
    response => {
      response.json().then(data => {
        setTimeout(() => {
          catFact.innerHTML = data.fact;
          catFact.classList.add('fade-in');
          catFact.classList.remove('fade-out');
        }, 500);
      })
    }
  ).catch(error => console.error('Error:', error));
}

getCatFact();
setInterval(getCatFact, 10000);

document.getElementById('city-button').addEventListener("click", () => {
  const selectedCity = document.getElementById('city-selector').value;
  console.log(selectedCity);
  const params = new URLSearchParams({
        city: selectedCity
    });

    window.location.href = 'profiles.html?' + params.toString();
});