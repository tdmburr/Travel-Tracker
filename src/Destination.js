class Destination {
  constructor(destinationData) {
    this.destinationData = destinationData;
  }

  acquireDestination(ID) {
    return this.destinationData.find(destination => destination.id === ID)
  }

  calculateCost(ID, numTravelers, duration) {
    const destination = this.acquireDestination(ID)
   
    const totalPriceWithFee = Math.round((destination.estimatedLodgingCostPerDay * duration + destination.estimatedFlightCostPerPerson * numTravelers) * 1.1)
    console.log(totalPriceWithFee)
    return totalPriceWithFee
  }
}



export default Destination;