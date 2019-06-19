import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CandidateList from '@/components/candidate/CandidateList.vue'

describe('CandidateList.vue', () => {
  it('exists', () => {
    const candidates = ['one', 1];
    const candidateList = shallowMount(CandidateList, {
      computed: {
        candidates() { return candidates; }
      }
    });
    expect(candidateList.vm).to.not.be.undefined;
  })

  it('generates a list of candidates', () => {
    const candidates = [['one', 1], ['two', 2]];
    const candidateList = shallowMount(CandidateList, {
      computed: {
        candidates() { return candidates; }
      }
    });
    expect(candidateList.findAll('candidate-stub').length).to.be.equal(candidates.length);
  })

})
