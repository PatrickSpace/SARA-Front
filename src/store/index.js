import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
    getToken: (state) => {return state.token}
    },
    mutations: {
      setToken(state, payload) {
        state.token = payload;
      },
    },
    actions: {
      leerToken({ commit }) {
        if (localStorage.getItem("token")) {
          commit("setToken", localStorage.getItem("token"));
        } else {
          commit("setToken", null);
        }
      },
      logout({ commit }) {
        localStorage.removeItem("token");
        commit("setToken", null);
        router.push("/login");
      },
    },
    modules: {},
  });
