import Vue from "vue";
import Vuex from "vuex";
import todos from "./modules/todos";
import notifications from "./modules/notifications";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    todos,
    notifications,
  }
});


export default store;

