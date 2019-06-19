import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

import KeyboardInput from '@/components/input/KeyboardInput'

const keyboardInput = shallowMount(KeyboardInput, {
  mocks: {
    $store: {
      state: () => {
        ''
      },
      commit: (key, value) => { return [key, value]; }
    },
    $autocomplete: {
      train: () => { return true; },
      getWords: () => { return [['neatish']]; }
    }
  }
});

describe('KeyboardInput.vue', () => {
  it('should exist', () => {
    expect(keyboardInput.vm).to.not.be.undefined;
  });

  it('should finish(fragment) a fragment', () => {
    expect(keyboardInput.vm.input).to.be.equal('');
    keyboardInput.vm.finish('neat');
    expect(keyboardInput.vm.input).to.be.equal('neatish');
  });

})
