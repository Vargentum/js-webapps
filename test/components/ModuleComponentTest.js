/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import module from 'components//ModuleComponent.js';

describe('simpleModule', () => {

    let {simpleModule} = module

    it('should exsist and contain properties', () => {
      expect(simpleModule).to.exist;
      expect(simpleModule.greet()).to.be.equal('hello world')
    });
});
