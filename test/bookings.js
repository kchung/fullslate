import { expect } from 'chai';
import util from './util';

describe('Bookings API', () => {
  describe('fetch', () => {

    it('should get individual booking', (done) => {
      const fsapi = util.getFullSlate();

      // Hardcoded appointment
      fsapi.bookings('ZnG9PYXF0r')
        .then((booking) => {
          expect(booking).to.be.an('object');
          expect(booking.id).to.equal('ZnG9PYXF0r');
          done();
        })
        .catch(done);
    });

    it('should throw an error on missing id', () => {
      const fsapi = util.getFullSlate();

      expect(() => fsapi.bookings()).to.throw('Invalid booking id');
    });

    it('should reject request with invalid booking id', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.bookings(-1)
        .then(done)
        .catch((response) => {
          expect(response.failure).to.be.true;
          expect(response.errorMessage).to.equal('No such booking.');
          done();
        });
    });

  });

  describe('create', () => {

    it('should throw error if invalid "at" time', () => {
      const fsapi = util.getFullSlate();
      const params = { service: 2 };

      expect(() => fsapi.book(params)).to.throw('Invalid at time');
    });

    it('should throw error if invalid service id', () => {
      const fsapi = util.getFullSlate();
      const params = { at: '2015-09-01T17:30:00-0700' };

      expect(() => fsapi.book(params)).to.throw('Invalid service');
    });

    it('should throw error if invalid first name', () => {
      const fsapi = util.getFullSlate();
      const params = {
        at: '2015-09-01T17:30:00-0700',
        service: 2,
        last_name: 'last_name'
      };

      expect(() => fsapi.book(params)).to.throw('Invalid first name');
    });

    it('should throw error if invalid last name', () => {
      const fsapi = util.getFullSlate();
      const params = {
        at: '2015-09-01T17:30:00-0700',
        service: 2,
        first_name: 'first_name'
      };

      expect(() => fsapi.book(params)).to.throw('Invalid last name');
    });

    it('should reject on invalid booking', (done) => {
      const fsapi = util.getFullSlate();
      const params = {
        at: '2015-09-01T17:30:00-0700',
        service: -1, // Invalid service id
        first_name: 'test_first_name',
        last_name: 'test_last_name'
      };

      fsapi.book(params)
        .then(done)
        .catch((result) => {
          expect(result).to.be.an('object');
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.exist;
          done();
        });
    });

  });
});
