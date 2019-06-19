import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import AutocompleteProvider from './services/AutocompleteProvider'

// Initialize fontawesome library.
library.add(faUserSecret, faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Create singleton service of our AutocompleteProvider.
Vue.prototype.$autocomplete = new AutocompleteProvider();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
