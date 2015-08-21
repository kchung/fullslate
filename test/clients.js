import { expect } from 'chai';
import util from './util';

describe('Clients API', () => {
  describe('fetch', () => {

    it('should throw an error when no token', () => {
      const fsapi = util.getFullSlate({
        key: util.getKey()
      });

      expect(() => fsapi.clients()).to.throw('FullSlate token missing');
    });

    it('should get all clients', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.clients()
        .then((clients) => {
          expect(clients).to.be.an('array');

          if (clients.length) {
            expect(clients[0].id).to.be.a('number');
          }

          done();
        })
        .catch(done);
    });

    it('should be flexible with its parameters', (done) => {
      const fsapi = util.getFullSlate();
      const additional = ['emails', 'phone_numbers', 'addresses', 'links'];
      const options = { include: additional };

      fsapi.clients(options)
        .then((clients) => {
          // Test client list
          expect(clients).to.be.an('array');
          expect(clients[0]).to.have.any.keys(additional);
          return clients[0];
        })
        .then((client) => {
          return fsapi.clients(client.id, options);
        })
        .then((client) => {
          // Test single client
          expect(client).to.be.an('object');
          expect(client).to.have.any.keys(additional);
          expect(client.id).to.equal(client.id);
        })
        .then(done)
        .catch(done);
    });

    it('should include additional requested fields', (done) => {
      const fsapi = util.getFullSlate();
      const additional = ['emails', 'phone_numbers', 'addresses', 'links'];

      fsapi.clients({ include: additional })
        .then((clients) => {
          expect(clients).to.be.an('array');

          if (clients.length) {
            expect(clients[0]).to.have.any.keys(additional);
          }

          done();
        })
        .catch(done);
    });

    it('should get an individual client', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.clients()
        .then((clients) => {
          const { id } = clients[0];
          return fsapi.clients(id);
        })
        .then((client) => {
          expect(client).to.be.an('object');
          expect(client).to.have.any.keys([
            'id', 'first_name', 'last_name', 'notes',
            'active', 'right_to_contact', 'emails',
            'phone_numbers', 'addresses', 'links'
          ]);
          done();
        })
        .catch(done);
    });

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.clients(-1)
        .then(done)
        .catch((result) => {
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.equal('Client not found.');
          done();
        })
        .catch(done);
    });

  });
});
