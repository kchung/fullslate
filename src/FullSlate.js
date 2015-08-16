import request from 'superagent';

/**
 * FullSlate API class
 * @class
 */
class FullSlate {

  /**
   * FullSlate API path
   * @member {string} API path, the `{key}` string will be replaced with
   *   with the real key on construction
   */
  path = 'https://{key}.fullslate.com/api/'

  /**
   * @constructs FullSlate
   * @param {object} options FullSlate API options
   * @param {string} options.key FullSlate key (e.g {key}.fullslate.com)
   * @param {string} [options.token] FullSlate API token
   * @throws Will throw error if the FullSlate key isn't defined
   */
  constructor(options = {}) {
    const { key, token } = options;

    if (typeof key === 'undefined') {
      throw new Error('No key defined');
    }

    this.key = key;
    this.token = token;

    // Build new path based off of `key`
    this.path = this.path.replace('{key}', this.key);
  }

  /**
   * Employees resource
   * @param {number} [id] Employee ID to limit details to a single
   *   employee
   * @throws Will throw error if employee id is not a number
   * @return {Promise.<(Array|Object), Error>} Resolve with the API
   *   response: if `id` provided an object of the employee will be
   *   returned, if no `id` provided, an array of all employees will
   *   be returned. Reject with request or API error.
   */
  employees(id) {
    if (typeof id !== 'undefined' && !Number.isInteger(id)) {
      throw new Error('Invalid employee id');
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'employees';

      // Update endpoint if `id` is provided
      if (id) {
        endpoint = endpoint + `/${id}`;
      }

      request.get(this.path + endpoint)
        .query({
          'auth': this.token
        })
        .end((err, res) => {
          if (res.body.failure) {
            reject(res.body);
          } else if (err) {
            reject(err);
          }

          resolve(res.body);
        });
    });
  }

};

export default FullSlate;
