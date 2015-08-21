import { expect } from 'chai';
import util from './util';

describe('Prdocuts API', () => {
  describe('fetch', () => {

    it('should throw an error when no token', () => {
      const fsapi = util.getFullSlate({
        key: util.getKey()
      });

      expect(() => fsapi.products()).to.throw('FullSlate token missing');
    });

    it('should get all products', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.products()
        .then((products) => {
          expect(products).to.be.an('array');

          if (products.length) {
            expect(products[0].id).to.be.a('number');
          }

          done();
        })
        .catch(done);
    });

    it('should get an individual product', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.products()
        .then((products) => {
          const { id } = products[0];
          return fsapi.products(id);
        })
        .then((product) => {
          expect(product).to.be.an('object');
          expect(product).to.have.any.keys([
            'id', 'services', 'name', 'product_type', 'price'
          ]);
          done();
        })
        .catch(done);
    });

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.products(-1)
        .then(done)
        .catch((result) => {
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.equal('Not found.');
          done();
        })
        .catch(done);
    });

  });
});
