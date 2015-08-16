import { expect } from 'chai';
import util from './util';

describe('Employees API', () => {
  describe('fetch', () => {

    it('should reject request with invalid query parameter', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.employees(-1)
        .catch((result) => {
          expect(result.failure).to.be.true;
          expect(result.errorMessage).to.equal('Employee not found.');
          done();
        })
        .catch(done);
    });

    it('should get employee list', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.employees()
        .then((employees) => {
          expect(employees).to.be.an('array');
        })
        .then(done)
        .catch(done);
    });

    it('should get single employee', (done) => {
      const fsapi = util.getFullSlate();

      fsapi.employees()
        .then((employees) => {
          return employees.length
            ? fsapi.employees(employees[0].id)
            : done(); // make test inconclusive
        })
        .then((employee) => {
          expect(employee).to.be.an('object');
          expect(employee).to.have.any.keys([
            'id', 'description', 'first_name', 'last_name', 'services'
          ]);
          expect(employee.services).to.be.an('array');
        })
        .then(done)
        .catch(done);
    });

    it('should throw error on invalid employee number', () => {
      const fsapi = util.getFullSlate();

      expect(() => fsapi.employees('invalid_id')).to.throw('Invalid employee id');
    });

  });
});
