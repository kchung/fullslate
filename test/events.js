import { expect } from 'chai';
import util from './util';

describe('Events API', () => {
  describe('fetch', () => {

    it('should throw an error when no token', () => {
      const fsapi = util.getFullSlate({
        key: util.getKey()
      });

      expect(() => fsapi.events()).to.throw('FullSlate token missing');
    });

    it('should get all events', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.events()
        .then((events) => {
          expect(events).to.be.an('array');

          if (events.length) {
            expect(events[0].id).to.be.a('string');
            expect(events[0].global_id).to.be.a('string');
          }

          done();
        })
        .catch(done);
    });

    it('should be flexible with its parameters', (done) => {
      const fsapi = util.getFullSlate();
      const options = {};

      fsapi.events(options)
        .then((events) => {
          // Test events list
          expect(events).to.be.an('array');
          return events[0];
        })
        .then((event) => {
          return fsapi.events(event.id, options);
        })
        .then((event) => {
          // Test single event
          expect(event).to.be.an('object');
          expect(event.id).to.equal(event.id);
        })
        .then(done)
        .catch(done);
    });

    it('should include occurences', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.events({ occurrences: true })
        .then((events) => {
          expect(events).to.be.an('array');

          if (events.length) {
            expect(events[0].occurrence_at).to.be.a('string');
          }

          done();
        })
        .catch(done);
    });

    it('should get an individual event', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.events()
        .then((events) => {
          const { id } = events[0];
          return fsapi.events(id);
        })
        .then((event) => {
          expect(event).to.be.an('object');
          expect(event).to.have.any.keys([
            'id', 'global_id', 'services', 'global_sequence',
            'created_at', 'at', 'type', 'to', 'employee', 'attendees'
          ]);
          done();
        })
        .catch(done);
    });

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.events(-1)
        .then(done)
        .catch((result) => {
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.equal('Event not found.');
          done();
        })
        .catch(done);
    });

  });
});
