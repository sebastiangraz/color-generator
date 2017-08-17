import Vue from 'vue'
 // import './colorManagement'
import App from './app.vue'
import './main.css'
import colorTab from './components/color-tab.vue'
Vue.component('color-tab', colorTab)



var vm = new Vue({
  el: '#app',
  render (createElement) {
    return createElement(App);
  }
})
