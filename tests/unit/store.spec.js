import { expect } from 'chai'

import Store from '@/store.js'

describe('Vuex Store', () => {

  it('should set candidates when asked to', () => {
    Store.state.candidates = [1, 2, 3];
    expect(Store.state.candidates.length).to.be.equal(3);
    Store.commit('setCandidates', 4);
    expect(Store.state.candidates).to.be.equal(4);
  })
  
  it('should clear candidates when asked to', () => {
    Store.state.candidates = [1, 2, 3];
    expect(Store.state.candidates.length).to.be.equal(3);
    Store.commit('clearCandidates');
    expect(Store.state.candidates.length).to.be.equal(0);
  })

  it('should clear output when asked to', () => {
    Store.state.output = 'yes';
    expect(Store.state.output).to.be.equal('yes');
    Store.commit('clearOutput');
    expect(Store.state.output).to.be.empty;
  })

  it('should update output when asked to', () => {
    Store.state.output = 'yes';
    expect(Store.state.output).to.be.equal('yes');
    Store.commit('updateOutput', ' indeed');
    expect(Store.state.output).to.be.equal('yes indeed');
  })

})
