// Imports
import './css/styles.css';
import { travelDataFetch } from './apiCalls';
import Traveler from './Traveler.js'
import Destination from './Destination';
import Trip from './Trip.js'

// Selectors
let traveler = document.querySelector('.greeting')
let pastTrips = document.querySelector('.travel-card-past')
let pendingTrips = document.querySelector('.travel-card-pending')
let cashTotal = document.querySelector('.cash')



// Globals
let travelers, trips, destinations
let userID = 2
let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);

// Event Listeners

window.addEventListener('load', function () {
  Promise.all([travelDataFetch('travelers'), travelDataFetch('trips'), travelDataFetch('destinations')])
  .then(data => {
    travelers = new Traveler(data[0].travelers);
    trips = new Trip(data[1].trips);
    destinations = new Destination(data[2].destinations);
    console.log(travelers, trips, destinations)
    renderDOM();
  })
  .then(() => {
    travelers.getTraveler(userID)
  });
});

// Methods

function renderDOM() {
  displayTraveler()
  renderPastTrips()
  renderTotal()
  renderPendingTrips()
}

function displayTraveler() {
  traveler.innerText = `Welcome ${travelers.getTraveler(userID).name}`
}

function renderPastTrips() {
  const displayPast = trips.acquirePastTrip(userID)
  displayPast.forEach(trip => {
    const destinationDisplay = destinations.acquireDestination(trip.destinationID)
    pastTrips.innerHTML +=   
    `
      <header class="card-top">
        <img class="dest-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="260px" height="200px">
      </header>
      <main class="card-middle">
        <p>${destinationDisplay.destination}</p>
      </main>
      <footer class="card-bottom">
        <p>Date Traveled: ${trip.date}</p>
      </footer>
    `
  }) 
}

function renderPendingTrips() {
  const displayPending = trips.acquirePendingTrip(userID)
  displayPending.forEach(trip => {
    const destinationDisplay = destinations.acquireDestination(trip.destinationID)
    pendingTrips.innerHTML +=   
    `
      <header class="card-top">
        <img class="dest-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="260px" height="200px">
      </header>
      <main class="card-middle">
        <p>${destinationDisplay.destination}</p>
      </main>
      <footer class="card-bottom">
        <p>Date Traveled: ${trip.date}</p>
      </footer>
    `
  }) 
}

function renderTotal() {
  const dollarConversion = Intl.NumberFormat('en-us')
  const displayPast = trips.acquirePastTrip(userID)
  let total = displayPast.reduce((acc, trip) => {
    acc += destinations.calculateCost(trip.destinationID, trip.travelers, trip.duration)
    return acc
  }, 0)
  total = dollarConversion.format(total)
  cashTotal.innerText = `Total Amount Spent: $${total}`
}

form.addEventListener('submit', () => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify({
      "id":1,
      "userID":44,
      "destinationID":49,
      "travelers":1,
      "date":"2022/09/16",
      "duration":8,
      "status":"approved",
      "suggestedActivities":[]
    }), 
    headers: {
      'Content-Type': 'application/json'
    }  
    .then(data => data.json())
    .then(json => console.log(json))
    .catch(err => console.log(`Error at: ${err}`))
  })
})

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

