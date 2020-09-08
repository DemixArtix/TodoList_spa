import Vue from "vue";
import mutations from "@/store/mutations";

const{ PUSH_NOTIFICATION } = mutations;

const notificationsStore= {
  namespaced: true,
  state: {
    notifications:  {
    },
  },
  getters: {
    notifications: ({notifications}) => notifications,
  },
  mutations: {
    [PUSH_NOTIFICATION](state, notification) {
      let index =  Object.keys(state.notifications).length;
      while (state.notifications.index) {
        index++;
      }
      Vue.set(state.notifications, index, notification);
      setTimeout(() => {
        Vue.delete(state.notifications, index);
      },4000)
    }
  },
  actions: {
    pushNotification({commit}, notification) {
      commit(PUSH_NOTIFICATION, notification);
    }
  }
};

export default notificationsStore;