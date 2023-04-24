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
  
    it('should be an instance of Destination', function() {
      expect(destination).to.be.an.instanceOf(Destination);
    })
  
    it('should take in a user ID', function() {
      expect(destination.destinationData[0].id).to.equal(49);
    });
  
    it('should take in a destination name', function() {
      expect(destination.destinationData[0].destination).to.equal("Castries, St Lucia");
    });
    
    it('should take in an estimated lodging cost per day at destination', function () {
      expect(destination.destinationData[0].estimatedLodgingCostPerDay).to.equal(650);
    });

    it('should take in an estimated flight cost per person', function () {
      expect(destination.destinationData[0].estimatedFlightCostPerPerson).to.equal(90);
    });

    it('should take in an image of the destination', function () {
      expect(destination.destinationData[0].image).to.equal("https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80");
    });

    it('should take in an alt text for image', function () {
      expect(destination.destinationData[0].alt).to.equal("aerial photography of rocky mountain under cloudy sky");
    });

    it('should be able to acquire a destination by its id', function () {

      expect(destination.acquireDestination(49)).to.deep.equal({
        "id":49,
        "destination":"Castries, St Lucia",
        "estimatedLodgingCostPerDay":650,
        "estimatedFlightCostPerPerson":90,
        "image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt":"aerial photography of rocky mountain under cloudy sky"
      });
    });

    it('should return as undefined if no such ID exists', function () {

      expect(destination.acquireDestination(86)).to.equal(undefined);
    });

    it('should calculate a total trip cost based off of the destinations info', function () {

      expect(destination.calculateCost(49, 1, 8)).to.equal(5819)
    });
});