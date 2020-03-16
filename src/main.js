import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyA6wNRQ6zNVSFdc9karO6nX2O7mdX_tv7c",
  projectId: "todo-fight",
  authDomain: "todo-fight.firebaseapp.com",
  databaseURL: "https://todo-fight.firebaseio.com",
  storageBucket: "todo-fight.appspot.com"
}

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
