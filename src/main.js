import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import firebase from 'firebase/app';
import 'firebase/database';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAhSx4e1Rch0xiVh_q4she56xAN_iPoDSc",
  authDomain: "to-do-list-spa.firebaseapp.com",
  databaseURL: "https://to-do-list-spa.firebaseio.com",
  projectId: "to-do-list-spa",
  storageBucket: "to-do-list-spa.appspot.com",
  messagingSenderId: "695661293163",
  appId: "1:695661293163:web:83632aad65a8a3a4844b2e",
  measurementId: "G-EZ5CH7KQGK"
};

firebase.initializeApp(firebaseConfig);


new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
