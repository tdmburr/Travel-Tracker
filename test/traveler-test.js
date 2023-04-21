import { expect }from 'chai';
import travelerData from './traveler-data';
import Traveler from '../src/Traveler';

describe('Traveler', function() {
  let traveler;
  
    this.beforeEach(() => {
      traveler = new Traveler(travelerData);
    })
    it('should be a function', function() {
      expect(Traveler).to.be.a('function');
    })
  
    it('should be an instance of Traveler', function() {
      expect(traveler).to.be.an.instanceOf(Traveler);
    })
  
    it('should take in a user ID', function() {
      expect(traveler.travelerData[0].id).to.equal(1);
    });
  
    it('should take in a travelers name', function() {
      expect(traveler.travelerData[0].name).to.equal("Ham Leadbeater");
    })
    
    it('should take in a travel style', function () {
      expect(traveler.travelerData[0].travelerType).to.equal("relaxer")
    })
})    
