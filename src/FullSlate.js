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
   * @return {Promise.<(Array|Object), (Object|Error)>} Resolve with the
   *   API response: if `id` provided, an object of the employee will be
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

  /**
   * Services resource
   * @param {number} [id] Service ID to limit details to a single service
   * @throws Will throw error if service id is not a number
   * @return {Promise.<(Array|Object), (Object|Error)>} Resolve with the
   *   API response: if `id` provided, an object of the service will be
   *   returned, if no `id` provided, an array of all services will
   *   be returned. Reject with request or API error.
   */
  services(id) {
    if (typeof id !== 'undefined' && !Number.isInteger(id)) {
      throw new Error('Invalid service id');
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'services';

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

  /**
   * Openings resource
   * @param {number|number[]} services A single service id or an array
   *   of service ids
   * @param {object} [options] Optional opening options
   * @param {string} [options.before] Openings before this date (RFC 3339
   *   formatted date)
   * @param {string} [options.after] Openings after this date (RFC 3339
   *   formatted date)
   * @param {string} [options.window] Valid window values are 'week' or 'month'
   * @throws Error will be thrown if `services` is invalid or missing
   * @return {Promise.<Object, (Object|Error)>} Resolve with the API response
   *   Reject with request or API error.
   */
  openings(services, options = {}) {

    // Validate `service` parameter
    if (Array.isArray(services)) {
      services.forEach((service) => {
        if (!Number.isInteger(service)) {
          throw new Error('Invalid services specified');
        }
      });
    } else if (!Number.isInteger(services)) {
      throw new Error('Invalid services specified');
    }

    return new Promise((resolve, reject) => {
      const endpoint = 'openings';
      let params = {
        auth: this.token,
        ...options
      };

      // Build services array
      params['services[]'] = Array.isArray(services)
        ? services.join(',')
        : services;

      request.get(this.path + endpoint)
        .query(params)
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
