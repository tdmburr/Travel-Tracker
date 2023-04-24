class Traveler {
  constructor(travelerData) {
    this.travelerData = travelerData;
    this.currentTraveler = undefined;
  }

  getTraveler(userID) {
    this.currentTraveler = this.travelerData.find(traveler => {
      return traveler.id === userID
    })
    return this.currentTraveler
  }
};




export default Traveler;