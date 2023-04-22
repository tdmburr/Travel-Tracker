// Imports
import './css/styles.css';
import { travelDataFetch } from './apiCalls';
import Traveler from './Traveler.js'
import Destination from './Destination';
import Trip from './Trip.js'

// Selectors
let traveler = document.querySelector('.greeting')
let pastTrips = document.querySelector('.travel-card')
let cashTotal = document.querySelector('.cash')



// Globals
let travelers, trips, destinations
let userID = 44

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




