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

});
