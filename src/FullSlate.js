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
   * @constructor FullSlate
   * @param {Object} options FullSlate API options
   * @param {String} options.key FullSlate key (e.g {key}.fullslate.com)
   * @param {String} [options.token] FullSlate API token
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
   * @param {Number} [id] Employee ID to limit details to a single
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
          auth: this.token,
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
   * @param {Number} [id] Service ID to limit details to a single service
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
          auth: this.token,
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
   * @param {Number|Number[]} services A single service id or an array
   *   of service ids
   * @param {Object} [options] Optional opening options
   * @param {String} [options.before] Openings before this date (RFC 3339
   *   formatted date)
   * @param {String} [options.after] Openings after this date (RFC 3339
   *   formatted date)
   * @param {String} [options.window] Valid window values are 'week' or 'month'
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
        ...options,
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

  /**
   * Bookings resource; fetching booking only
   * @param {String} id FullSlate booking id
   * @throws Error will be thrown on invalid booking id
   * @return {Promise.<Object, (Object|Error)>} Resolve with the
   *   booking response. Reject with request or API error
   */
  bookings(id) {
    if (typeof id === 'undefined') {
      throw new Error('Invalid booking id');
    }

    return new Promise((resolve, reject) => {
      const endpoint = `bookings/${id}`;

      request.get(this.path + endpoint)
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
   * Book a booking through bookings resource
   * @param {Object} options
   * @param {String} options.at Booking time
   * @param {Number} options.service Service ID
   * @param {String} options.first_name Client first name
   * @param {String} options.last_name Client last name
   * @throws Error will be thrown on invalid required parameters
   * @return {Promise.<Object, (Object|Error)>} Resolve with the
   *   booking response. Reject with request or API error
   */
  book(options = {}) {
    const { at, service, first_name, last_name } = options;

    if (typeof at === 'undefined') {
      throw new Error('Invalid at time');
    } else if (typeof service === 'undefined') {
      throw new Error('Invalid service');
    } else if (typeof first_name === 'undefined') {
      throw new Error('Invalid first name');
    } else if (typeof last_name === 'undefined') {
      throw new Error('Invalid last name');
    }

    return new Promise((resolve, reject) => {
      const endpoint = 'bookings';

      request.post(this.path + endpoint)
        .send(options)
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
   * Clients resource, this is a private company resource so a token is
   * required
   * @param {Number} [id] Client ID to limit details to a single client
   * @param {Object} [options]
   * @param {Array} [options.include] Additional fields to request for:
   *   'emails', 'phone_numbers', 'addresses', and 'links'
   * @throws Error will be thrown if API not initialized with token
   * @return {Promise.<(Object|Array), Error>} Resolve with client request.
   *   Reject with request or API error.
   */
  clients(id, options = {}) {
    if (typeof this.token === 'undefined') {
      throw new Error('FullSlate token missing');
    }

    // If only options are passed, swap out id params
    if (typeof id === 'object') {
      options = id;
      id = undefined;
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'clients';
      let params = {
        auth: this.token,
      };

      if (id) {
        endpoint = endpoint + `/${id}`;
      }

      if (options.include) {
        params.include = options.include.join(',');
      }

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

  /**
   * Events resource, this is a private company resource so a token is
   * required
   * @param {Number} [id] Event ID to limit details to a single event
   * @param {Object} [options]
   * @param {Boolean} [options.occurrences]
   * @param {String} [options.start] Date format yyyy-mm-dd
   * @param {String} [options.stop] Date format yyyy-mm-dd
   * @param {String} [options.changed_since] Date format yyyy-mm-dd
   * @throws Error will be thrown if API not initialized with token
   * @return {Promise.<(Array|Object), Error>} Resolve with events request.
   *   Reject with request or API error.
   */
  events(id, options = {}) {
    if (typeof this.token === 'undefined') {
      throw new Error('FullSlate token missing');
    }

    // If only options are passed, swap out id params
    if (typeof id === 'object') {
      options = id;
      id = undefined;
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'events';
      let params = {
        auth: this.token,
        ...options,
      };

      if (id) {
        endpoint = endpoint + `/${id}`;
      }

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

  /**
   * Products resource, this is a private company resource so a token is
   * required
   * @param {Number} [id] Product ID to limit details to a single product
   * @throws Error will be thrown if API not initialized with token
   * @return {Promise.<(Object|Array), Error>} Resolve with products request.
   *   Reject with request or API error.
   */
  products(id) {
    if (typeof this.token === 'undefined') {
      throw new Error('FullSlate token missing');
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'products';
      let params = {
        auth: this.token,
      };

      if (id) {
        endpoint = endpoint + `/${id}`;
      }

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

  /**
   * Vouchers resource, this is a private company resource so a token is
   * required
   * @param {Number} [id] Product ID to limit details to a voucher product
   * @throws Error will be thrown if API not initialized with token
   * @return {Promise.<(Object|Array), Error>} Resolve with vouchers request.
   *   Reject with request or API error.
   */
  vouchers(id) {
    if (typeof this.token === 'undefined') {
      throw new Error('FullSlate token missing');
    }

    return new Promise((resolve, reject) => {
      let endpoint = 'vouchers';
      let params = {
        auth: this.token,
      };

      if (id) {
        endpoint = endpoint + `/${id}`;
      }

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
