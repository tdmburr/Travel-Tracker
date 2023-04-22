class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  acquirePastTrip(userID) {
    return this.tripData.filter(trip => trip.userID === userID)
  }
}

export default Trip;