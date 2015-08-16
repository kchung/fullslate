import { expect } from 'chai';
import util from './util';

describe('Openings API', () => {
  describe('fetch', () => {

    let services;

    before((done) => {
      const fsapi = util.getFullSlate();

      fsapi.services()
        .then((result) => {
          if (result.length) {
            services = result;
            done();
          } else {
            // Inconclusive
            done();
          }
        });
    });

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.openings(-1)
        .then(done)
        .catch((response) => {
          expect(response.failure).to.be.true;
          expect(response.errorMessage).to.equal('Service ID required for openings search.');
          done();
        })
        .catch(done);
    });

    it('should get openings for a service', (done) => {
      const fsapi = util.getFullSlate();

      if (services.length) {
        fsapi.openings(services[0].id)
          .then((openings) => {
            expect(openings).to.be.an('object');
            expect(openings).to.have.any.keys([
              'matches', 'tz', 'success'
            ]);
            expect(openings.success).to.be.true;
            expect(openings.matches).to.be.an('array');
          })
          .then(done)
          .catch(done);
      } else {
        // TODO: make test inconclusive when services don't exist
        done();
      }
    });

    it.skip('should get openings for multiple services', (done) => {
      const fsapi = util.getFullSlate();

      if (services.length) {
        return fsapi.openings(services.splice(0, 2).map((key) => key.id))
          .then((openings) => {
            // My account doesn't have multiple services, I can't test!
          })
          .then(done)
          .catch(done);
      } else {
        // TODO: make test inconclusive when services don't exist
        done();
      }
    });

    it('should throw error on missing service id', () => {
      const fsapi = util.getFullSlate();

      expect(() => fsapi.openings()).to.throw('Invalid services specified');
    });

    it('should throw error on invalid services array', () => {
      const fsapi = util.getFullSlate();
      const invalidServices = ['1', '2', '3'];

      expect(() => fsapi.openings(invalidServices)).to.throw('Invalid services specified');
    });

  });
});
