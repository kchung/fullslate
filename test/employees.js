import { expect } from 'chai';
import FullSlate from '../src/FullSlate';

describe('Employees API', () => {
  describe('fetch', () => {
    const { FULLSLATE_KEY, FULLSLATE_TOKEN } = process.env;

    it('should get employee list', (done) => {
      const fsapi = new FullSlate({
        key: FULLSLATE_KEY,
        token: FULLSLATE_TOKEN
      });

      fsapi.employees()
        .then((employees) => {
          expect(employees).to.be.an('array');
        })
        .then(done);
    });

    it('should get single employee', (done) => {
      const fsapi = new FullSlate({
        key: FULLSLATE_KEY,
        token: FULLSLATE_TOKEN
      });

      fsapi.employees()
        .then((employees) => {
          return employees.length
            ? fsapi.employees(employees[0].id)
            : done(); // make test inconclusive
        })
        .then((employee) => {
          const { id, first_name, last_name, services } = employee;

          expect(employee).to.be.an('object');
          expect(id).to.exist;
          expect(first_name).to.exist;
          expect(last_name).to.exist;
          expect(services).to.exist;
        })
        .then(done);
    });

    it('should reject invalid employee', (done) => {
      const fsapi = new FullSlate({
        key: FULLSLATE_KEY,
        token: FULLSLATE_TOKEN
      });

      fsapi.employees(-1)
        .catch((result) => {
          const { failure, errorMessage } = result;

          expect(failure).to.be.true;
          expect(errorMessage).to.equal('Employee not found.');
          done();
        });
    });

    it('should reject invalid employee number', () => {
      const fsapi = new FullSlate({
        key: FULLSLATE_KEY,
        token: FULLSLATE_TOKEN
      });

      expect(() => fsapi.employees('invalid_id')).to.throw('Invalid employee id');
    });

  });
});
