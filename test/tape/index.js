import tape from 'tape'
import thunk from 'redux-thunk';

import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/should';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);
registerAssertions();

describe('tape', () => {
  describe('', () => {
    it('', (done) => {
      done()
    })
  });
});
