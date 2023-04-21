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
      expect(traveler.travelerData[0].id).to.equal(44);
    });
  
    it('should take in a travelers name', function() {
      expect(traveler.travelerData[0].name).to.equal("Marijo MacNeilley");
    })
    
    it('should take in a travel style', function () {
      expect(traveler.travelerData[0].travelerType).to.equal("photographer")
    })

    it('should take in a current traveler', function () {
      expect(traveler.currentTraveler).to.equal(undefined)
    })

    it('should have a method to return a current traveler', function () {
      
      expect(traveler.getTraveler(44)).to.deep.equal({
        "id":44,
        "name":"Marijo MacNeilley",
        "travelerType":"photographer" 
      })
    })

    it('should return undefined if a user ID doesnt exist', function () {
      expect(traveler.getTraveler(54)).to.equal(undefined)
    })

    
})    
