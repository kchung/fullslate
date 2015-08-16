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

};

export default FullSlate;
