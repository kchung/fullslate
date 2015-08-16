/**
 * Testing utility module
 * This module should be imported before any tests are run
 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import FullSlate from '../src/FullSlate';

chai.use(chaiAsPromised);

const util = {

  /**
   * Get required FullSlate credentials
   * @return {object} Object containing the FullSlate key and token
   *   defined from the env variables
   */
  getCredentials() {
    return {
      key: util.getKey(),
      token: util.getToken()
    };
  },

  /**
   * Get FullSlate key from env
   * @return {string} FullSlate key defined as env, if none provided
   *   `NO_KEY` will be returned (some tests will fail)
   */
  getKey() {
    return process.env.FULLSLATE_KEY || 'NO_KEY';
  },

  /**
   * Get FullSlate token from env
   * @return {string} FullSlate token defined as env, if none provided
   *   `NO_TOKEN` will be returned (some tests will fail)
   */
  getToken() {
    return process.env.FULLSLATE_TOKEN || 'NO_TOKEN';
  },

  /**
   * Get initialized FullSlate class
   * @param {object} [options] Default to FullSlate env varibles if no
   *   options are provided
   * @return {FullSlate} Instantiated FullSlate class
   */
  getFullSlate(options = util.getCredentials()) {
    return new FullSlate(options);
  }

};

export default util;
