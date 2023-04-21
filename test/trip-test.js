import { expect }from 'chai';
import tripsData from './trip-data';
import Trip from '../src/Trip';

describe('Trip', function() {
  let trip;
  
    this.beforeEach(() => {
      trip = new Trip(tripsData);
    })
    it('should be a function', function() {
      expect(Trip).to.be.a('function');
    })
  
    it('should be an instance of Traveler', function() {
      expect(trip).to.be.an.instanceOf(Trip);
    })
  
    it('should take in an ID', function() {
      expect(trip.tripData[0].id).to.equal(1);
    });
  
    it('should take in a user ID', function() {
      expect(trip.tripData[0].userID).to.equal(44);
    })
    
    it('should take in a destination ID', function () {
      expect(trip.tripData[0].destinationID).to.equal(49)
    })

    it('should take in a traveler', function () {
      expect(trip.tripData[0].travelers).to.equal(1)
    })

    it('should take in a date', function () {
      expect(trip.tripData[0].date).to.equal("2022/09/16")
    })

    it('should take in a trip duration', function () {
      expect(trip.tripData[0].duration).to.equal(8)
    })

    it('should take in a trip status', function () {
      expect(trip.tripData[0].status).to.equal("approved")
    })

    it('should take in a suggested activity', function () {
      expect(trip.tripData[0].suggestedActivities).to.deep.equal([])
    })

    it('should find a user trip by an id value', function () {
      expect(trip.acquirePastTrip("userID", 44)).to.deep.equal([
        {
          id: 1,
          userID: 44,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        }
      ])
    })
})  