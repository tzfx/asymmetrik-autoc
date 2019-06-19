import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'

import App from '@/App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

describe('App.vue', () => {
  it('exists', () => {
    expect(App).to.not.be.undefined;
  })

  it('defaults to training mode', () => {
    expect(App.data().mode).to.be.equal('training');
  })

  it('switches mode via click', () => {
    const test = shallowMount(App);
    test.find('#keyboard').trigger('click');
    expect(test.vm.$data.mode).to.be.equal('keyboard');
    test.find('#training').trigger('click');
    expect(test.vm.$data.mode).to.be.equal('training');
  })
})
