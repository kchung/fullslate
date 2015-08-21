import { expect } from 'chai';
import util from './util';

describe('Vouchers API', () => {
  describe('fetch', () => {

    it('should throw an error when no token', () => {
      const fsapi = util.getFullSlate({
        key: util.getKey()
      });

      expect(() => fsapi.vouchers()).to.throw('FullSlate token missing');
    });

    it('should get all vouchers', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.vouchers()
        .then((vouchers) => {
          expect(vouchers).to.be.an('array');

          done();
        })
        .catch(done);
    });

    it.skip('should get an individual voucher', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.vouchers()
        .then((vouchers) => {
          const { id } = vouchers[0];
          return fsapi.vouchers(id);
        })
        .then((voucher) => {
          expect(voucher).to.be.an('object');
          done();
        })
        .catch(done);
    });

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.vouchers(-1)
        .then(done)
        .catch((result) => {
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.equal('Invalid redemption code, please check the value and try again.');
          done();
        })
        .catch(done);
    });

  });
});
