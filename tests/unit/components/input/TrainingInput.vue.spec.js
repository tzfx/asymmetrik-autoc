import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import TrainingInput from '@/components/input/TrainingInput'

describe('TrainingInput.vue', () => {
  it('should exist', () => {
    expect(mount(TrainingInput).vm).to.not.be.undefined;
  });

  it('should submit and clear input on save click.', () => {
    const trainingInput = mount(TrainingInput, {
      mocks: {
        $autocomplete: {
          train: (input) => { return input; }
        }
      }
    });
    expect(trainingInput.vm.input).to.be.equal('')
    trainingInput.vm.input = 'test';
    expect(trainingInput.vm.submitted).to.be.equal(0);
    trainingInput.find('button').trigger('click');
    expect(trainingInput.vm.submitted).to.be.equal(true);
    expect(trainingInput.vm.input).to.be.equal('');
  });

  it('should fadeIn/Out the Updated icon based on submission', () => {
    const trainingInput = mount(TrainingInput);
    trainingInput.vm.submitted = false;
    expect(trainingInput.find('span').classes()).to.contain('fadeOut');
    trainingInput.vm.submitted = true;
    expect(trainingInput.find('span').classes()).to.contain('fadeIn');
  })
});
