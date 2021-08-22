import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
Vue.use(Vuex);

import usuarioStore from "./usuarioStore";
import NotificationStore from "./NotificationStore";
import proyectoStore from "./proyectoStore";

export default new Vuex.Store({
  state: {
    token: null,
    currentusuario: {
      nombre: "Quispe",
      rol: "Director",
    },
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getCurrentUser: (state) => {
      return state.currentusuario;
    },
    getCurrentUserRol: (state) => {
      return state.currentusuario.rol;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    leerToken({ dispatch }, payload) {
      const now = new Date();
      const token = localStorage.getItem("token");
      const expira = localStorage.getItem("expira");
      const expirado = now.getTime() > expira;
      if (token && expira) {
        if (expirado) {
          dispatch("logout");
          dispatch(
            "noti/agregarNotificacionErronea",
            "Su sesion ha expirado, por favor inicie sesión de nuevo"
          );
          if (payload === "login") {
            console.log("token expirado en ruta login");
            dispatch(
              "noti/agregarNotificacionErronea",
              "Su sesion ha expirado, por favor inicie sesión de nuevo"
            );
          } else {
            router.push("login");
          }
        } else dispatch("setLocalToken", token);
      } else {
        dispatch("logout");
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("expira");
      commit("setToken", null);
    },
    setLocalToken({ commit }, token) {
      localStorage.setItem("token", token);
      commit("setToken", token);
      axios.defaults.headers["x-access-token"] = localStorage.getItem("token");
    },
  },
  modules: {
    usuario: usuarioStore,
    noti: NotificationStore,
    proyecto: proyectoStore,
  },
});
