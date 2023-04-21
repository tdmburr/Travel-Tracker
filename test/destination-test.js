import { expect }from 'chai';
import destinationsData from './destination-data';
import Destination from '../src/Destination';

describe('Destination', function() {
  let destination;
  
    this.beforeEach(() => {
      destination = new Destination(destinationsData);
    })
    it('should be a function', function() {
      expect(Destination).to.be.a('function');
    })
  
    it('should be an instance of Traveler', function() {
      expect(destination).to.be.an.instanceOf(Destination);
    })
  
    it('should take in a user ID', function() {
      expect(destination.destinationData[0].id).to.equal(1);
    });
  
    it('should take in a destination name', function() {
      expect(destination.destinationData[0].destination).to.equal("Lima, Peru");
    })
    
    it('should take in an estimated lodging cost per day at destination', function () {
      expect(destination.destinationData[0].estimatedLodgingCostPerDay).to.equal(70)
    })

    it('should take in an estimated flight cost per person', function () {
      expect(destination.destinationData[0].estimatedFlightCostPerPerson).to.equal(400)
    })

    it('should take in an image of the destination', function () {
      expect(destination.destinationData[0].image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80")
    })

    it('should take in an alt text for image', function () {
      expect(destination.destinationData[0].alt).to.equal("overview of city buildings with a clear sky")
    })
})   