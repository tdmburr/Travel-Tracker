// Imports
import './css/styles.css';
import { travelDataFetch } from './apiCalls';
import Traveler from './Traveler.js'
import Destination from './Destination';
import Trip from './Trip.js';

// Selectors
let topBar = document.querySelector('.top-bar');
let traveler = document.querySelector('.greeting');
let pastTrips = document.querySelector('.travel-card-past');
let pendingTrips = document.querySelector('.travel-card-pending');
let cashTotal = document.querySelector('.cash');
let destinationForm = document.querySelector('#destination');
let dateForm = document.querySelector('#date');
let durationForm = document.querySelector('#duration');
let travelerForm = document.querySelector('#travelers');
let form = document.querySelector('.post-form');
let estimateButton = document.querySelector('.estimate');
let costEstimate = document.querySelector('.estimate-cost');
let loginForm = document.querySelector('#userLogin');
let login = document.querySelector('#loginButton');
let loginHeader = document.querySelector('#loginHeader');
let username = document.querySelector('#username');
let password = document.querySelector('#password');

// Globals
let travelers, trips, destinations;
let userID = 1;
let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let dollarConversion = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// Event Listeners

window.addEventListener('load', initializeData);

estimateButton.addEventListener('click', estimateThisTrip);

login.addEventListener('click', acceptUser);

// Methods

function initializeData() {
  Promise.all([travelDataFetch('travelers'), travelDataFetch('trips'), travelDataFetch('destinations')])
  .then(data => {
    travelers = new Traveler(data[0].travelers);
    trips = new Trip(data[1].trips);
    destinations = new Destination(data[2].destinations);
    console.log(travelers, trips, destinations)
    renderDOM()
  })
  .catch(err => console.log(`Error at: ${err}`))
};

function renderDOM() {
  displayTraveler();
  renderPastTrips();
  renderTotal();
  renderPendingTrips();
  displayCalendar();
  displayDestinationsSelection(destinations);
}

function acceptUser(event) {
  event.preventDefault();
  const user = username.value;
  const pass = password.value;
  let userLog = parseInt(user.replace("traveler", ""));
  if (pass === 'travel' && userLog <= 50 && userLog >= 1) {
    userID = userLog
    renderDOM()
    hide(loginForm)
    hide(loginHeader)
    show(topBar)
    show(pastTrips)
    show(pendingTrips)
  } else {
    alert('Traveler IDs(numbers) must be 1 to 50. You must have a correct password.')
  };
};

function displayCalendar() {
  dateForm.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
}

function displayTraveler() {
  traveler.innerText = `Welcome ${travelers.getTraveler(userID).name}`;
}

function renderPastTrips() {
  const displayPast = trips.acquirePastTrip(userID);
  pastTrips.innerHTML = '<h1 class="past">Past Trips</h1>';
  displayPast.forEach(trip => {
    const destinationDisplay = destinations.acquireDestination(trip.destinationID)
    pastTrips.innerHTML +=   
    ` <section class="user-card"
        <header class="card-top">
          <img class="dest-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="260px" height="200px">
        </header>
        <main class="card-middle">
          <p>${destinationDisplay.destination}</p>
        </main>
        <footer class="card-bottom">
          <p>Date Traveled: ${trip.date}</p>
          <p>Estimated Cost: ${dollarConversion.format(destinations.calculateCost(trip.destinationID, trip.travelers, trip.duration))}</p>
        </footer>
      </section><br>  
    `
  });
};

function renderPendingTrips() {
  const displayPending = trips.acquirePendingTrip(userID);
  pendingTrips.innerHTML = '<h1 class="pending">Pending Trips</h1>';
  displayPending.forEach(trip => {
    const destinationDisplay = destinations.acquireDestination(trip.destinationID)
    pendingTrips.innerHTML +=   
    ` <section class="user-card">
        <header class="card-top">
          <img class="dest-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="260px" height="200px">
        </header>
        <main class="card-middle">
          <p>${destinationDisplay.destination}</p>
        </main>
        <footer class="card-bottom">
          <p>Travel Date: ${trip.date}</p>
          <p>Estimated Cost: ${dollarConversion.format(destinations.calculateCost(trip.destinationID, trip.travelers, trip.duration))}</p>
        </footer>
      </section><br>  
    `
  }) 
};

function renderTotal() {
  const displayPast = trips.acquirePastTrip(userID);
  let total = displayPast.reduce((acc, trip) => {
    acc += destinations.calculateCost(trip.destinationID, trip.travelers, trip.duration)
    return acc
  }, 0)
  total = dollarConversion.format(total);
  cashTotal.innerText = `Total Amount Spent: ${total}`;
}

function estimateThisTrip(event) {
  event.preventDefault()
  if (durationForm.value && travelerForm.value && destinationForm.value) {
    let thisTotal = destinations.calculateCost(parseInt(destinationForm.value), parseInt(travelerForm.value), parseInt(durationForm.value))
    thisTotal = dollarConversion.format(thisTotal)
    costEstimate.innerText = `Estimated cost for this trip: ${thisTotal}`
  } else {
    alert("Please fill out all of the forms before estimating a cost.")
  };
};

function displayDestinationsSelection(destinations) {
  destinations.destinationData.forEach(destination => {
    destinationForm.innerHTML += `<option id="${destination.id}" value="${destination.id}">${destination.destination}</option>`
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify({
      "id": parseInt(trips.tripData.length + 1),
      "userID": userID,
      "destinationID": parseInt(destinationForm.value),
      "travelers": parseInt(travelerForm.value),
      "date": document.getElementById('dateInput').value.split('-').join('/'),
      "duration": durationForm.value,
      "status":"pending",
      "suggestedActivities":[]
    }), 
    headers: {
      'Content-Type': 'application/json'
    }  
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    initializeData()
  })
  .catch(err => console.log(`Error at: ${err}`))

  durationForm.value = "";
  travelerForm.value = "";
  destinationForm.value = "";
});

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}


