import Vue from 'vue'
import App from './App.vue'
import TicTacToe from './components/TicTacToe'

//新增sass全局設定
import './assets/stylesheets/scss/main.scss'
//新增字型樣式
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



Vue.component('tic-tac-toe', TicTacToe);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
