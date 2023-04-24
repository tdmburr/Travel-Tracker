class Trip {
  constructor(tripData) {
    this.tripData = tripData;
  }

  acquirePastTrip(userID) {
    return this.tripData.filter(trip => trip.userID === userID && trip.status === 'approved');
  };

  acquirePendingTrip(userID) {
    const filterTrip = this.tripData.filter(trip => {
      if (trip.userID === userID && trip.status === 'pending') { 
        return trip
      }
    })
    return filterTrip
  };
};


export default Trip;