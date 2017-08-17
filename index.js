import Vue from 'vue'
 // import './colorManagement'
import App from './app.vue'
import './main.css'

var vm = new Vue({
  el: '#app',
  render (createElement) {
    return createElement(App);
  }
})
