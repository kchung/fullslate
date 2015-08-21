'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

/**
 * FullSlate API class
 * @class
 */

var FullSlate = (function () {

  /**
   * @constructor FullSlate
   * @param {Object} options FullSlate API options
   * @param {String} options.key FullSlate key (e.g {key}.fullslate.com)
   * @param {String} [options.token] FullSlate API token
   * @throws Will throw error if the FullSlate key isn't defined
   */

  function FullSlate() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, FullSlate);

    this.path = 'https://{key}.fullslate.com/api/';
    var key = options.key;
    var token = options.token;

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

  _createClass(FullSlate, [{
    key: 'employees',
    value: function employees(id) {
      var _this = this;

      if (typeof id !== 'undefined' && !Number.isInteger(id)) {
        throw new Error('Invalid employee id');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'employees';

        // Update endpoint if `id` is provided
        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        _superagent2['default'].get(_this.path + endpoint).query({
          auth: _this.token
        }).end(function (err, res) {
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
  }, {
    key: 'services',
    value: function services(id) {
      var _this2 = this;

      if (typeof id !== 'undefined' && !Number.isInteger(id)) {
        throw new Error('Invalid service id');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'services';

        // Update endpoint if `id` is provided
        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        _superagent2['default'].get(_this2.path + endpoint).query({
          auth: _this2.token
        }).end(function (err, res) {
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
  }, {
    key: 'openings',
    value: function openings(services) {
      var _this3 = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // Validate `service` parameter
      if (Array.isArray(services)) {
        services.forEach(function (service) {
          if (!Number.isInteger(service)) {
            throw new Error('Invalid services specified');
          }
        });
      } else if (!Number.isInteger(services)) {
        throw new Error('Invalid services specified');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'openings';
        var params = _extends({
          auth: _this3.token
        }, options);

        // Build services array
        params['services[]'] = Array.isArray(services) ? services.join(',') : services;

        _superagent2['default'].get(_this3.path + endpoint).query(params).end(function (err, res) {
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
  }, {
    key: 'bookings',
    value: function bookings(id) {
      var _this4 = this;

      if (typeof id === 'undefined') {
        throw new Error('Invalid booking id');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'bookings/' + id;

        _superagent2['default'].get(_this4.path + endpoint).end(function (err, res) {
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
  }, {
    key: 'book',
    value: function book() {
      var _this5 = this;

      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var at = options.at;
      var service = options.service;
      var first_name = options.first_name;
      var last_name = options.last_name;

      if (typeof at === 'undefined') {
        throw new Error('Invalid at time');
      } else if (typeof service === 'undefined') {
        throw new Error('Invalid service');
      } else if (typeof first_name === 'undefined') {
        throw new Error('Invalid first name');
      } else if (typeof last_name === 'undefined') {
        throw new Error('Invalid last name');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'bookings';

        _superagent2['default'].post(_this5.path + endpoint).send(options).end(function (err, res) {
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
  }, {
    key: 'clients',
    value: function clients(id) {
      var _this6 = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (typeof this.token === 'undefined') {
        throw new Error('FullSlate token missing');
      }

      // If only options are passed, swap out id params
      if (typeof id === 'object') {
        options = id;
        id = undefined;
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'clients';
        var params = {
          auth: _this6.token
        };

        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        if (options.include) {
          params.include = options.include.join(',');
        }

        _superagent2['default'].get(_this6.path + endpoint).query(params).end(function (err, res) {
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
  }, {
    key: 'events',
    value: function events(id) {
      var _this7 = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (typeof this.token === 'undefined') {
        throw new Error('FullSlate token missing');
      }

      // If only options are passed, swap out id params
      if (typeof id === 'object') {
        options = id;
        id = undefined;
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'events';
        var params = _extends({
          auth: _this7.token
        }, options);

        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        _superagent2['default'].get(_this7.path + endpoint).query(params).end(function (err, res) {
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
  }, {
    key: 'products',
    value: function products(id) {
      var _this8 = this;

      if (typeof this.token === 'undefined') {
        throw new Error('FullSlate token missing');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'products';
        var params = {
          auth: _this8.token
        };

        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        _superagent2['default'].get(_this8.path + endpoint).query(params).end(function (err, res) {
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
  }, {
    key: 'vouchers',
    value: function vouchers(id) {
      var _this9 = this;

      if (typeof this.token === 'undefined') {
        throw new Error('FullSlate token missing');
      }

      return new Promise(function (resolve, reject) {
        var endpoint = 'vouchers';
        var params = {
          auth: _this9.token
        };

        if (id) {
          endpoint = endpoint + ('/' + id);
        }

        _superagent2['default'].get(_this9.path + endpoint).query(params).end(function (err, res) {
          if (res.body.failure) {
            reject(res.body);
          } else if (err) {
            reject(err);
          }

          resolve(res.body);
        });
      });
    }
  }]);

  return FullSlate;
})();

;

exports['default'] = FullSlate;
module.exports = exports['default'];

/**
 * FullSlate API path
 * @member {string} API path, the `{key}` string will be replaced with
 *   with the real key on construction
 */
