class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  acquirePastTrip(userID, id) {
    return this.tripData.filter(trip => trip[userID] === id)
  }
}

export default Trip;