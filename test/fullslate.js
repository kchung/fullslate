import { expect } from 'chai';
import util from './util';

describe('FullSlate class', () => {
  describe('construction', () => {

    it('should fail when no key provided', () => {
      expect(() => util.getFullSlate({})).to.throw('No key defined');
    });

    it('should store correct key', () => {
      const fsapi = util.getFullSlate({
        key: 'test_key',
        token: 'test_token'
      });

      expect(fsapi.key).to.equal('test_key');
    });

    it('should store correct token', () => {
      const fsapi = util.getFullSlate({
        key: 'test_key',
        token: 'test_token'
      });

      expect(fsapi.token).to.equal('test_token');
    });

    it('should build correct path' , () => {
      const fsapi = util.getFullSlate({
        key: 'test_key',
        token: 'test_token'
      });

      expect(fsapi.path).to.equal('https://test_key.fullslate.com/api/');
    });

  });
});
