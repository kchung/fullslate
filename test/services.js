import { expect } from 'chai';
import util from './util';

describe('Services API', () => {
  describe('fetch', () => {

    it('should get services list', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.services()
        .then((services) => {
          expect(services).to.be.an('array');
        })
        .then(done)
        .catch(done);
    });

    it('should get single service', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.services()
        .then((services) => {
          return services.length
            ? fsapi.services(services[0].id)
            : done(); // make test inconclusive
        })
        .then((service) => {
          expect(service).to.be.an('object');
          expect(service).to.have.any.keys([
            'id', 'description', 'time', 'name', 'buffer_before',
            'buffer_cleanup', 'price', 'employees'
          ]);
          expect(service.employees).to.be.an('array');
        })
        .then(done)
        .catch(done);
    });

    it('should reject invalid service', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.services(-1)
        .catch((result) => {
          const { failure, errorMessage } = result;

          expect(failure).to.be.true;
          expect(errorMessage).to.equal('Service not found.');
          done();
        })
        .catch(done);
    });

    it('should reject invalid service number', () => {
      const fsapi = util.getFullSlate();

      expect(() => fsapi.services('invalid_service')).to.throw('Invalid service id');
    });

  });
});
