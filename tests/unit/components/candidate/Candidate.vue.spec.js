import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'

import Candidate from '@/components/candidate/Candidate.vue'

describe('Candidate.vue', () => {
  it('exists', () => {
    expect(shallowMount(Candidate).vm).to.not.be.undefined;
  })

  it('generates a candidate button', () => {
    const candidate = mount(Candidate)
    candidate.setProps({word: 'test', confidence: 1});
    expect(candidate.contains('button')).to.be.equal(true);
    expect(candidate.text()).to.be.equal('test (1)');
  })

})
