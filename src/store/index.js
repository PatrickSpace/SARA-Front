import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
Vue.use(Vuex);

import usuarioStore from "./usuarioStore";
import NotificationStore from "./NotificationStore";
import proyectoStore from "./proyectoStore";

//buscar roles
const buscarRol = (roles) => {
  let rol = null;
  if (roles) {
    roles = roles.map(function(rol) {
      return rol.nombre;
    });
    const dfound = roles.find((r) => r === "director");
    const cfound = roles.find((r) => r === "coordinador");
    const pfound = roles.find((r) => r === "profesor");
    if (dfound) rol = "Director";
    else if (cfound) rol = "Coordinador";
    else if (pfound) rol = "Profesor";
  }
  return rol;
};

export default new Vuex.Store({
  state: {
    token: null,
    currentusuario: {
      nombre: "",
      rol: "",
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
    setCurrentUsername(state, payload) {
      state.currentusuario.nombre = payload;
    },
    setCurrentRol(state, payload) {
      state.currentusuario.rol = payload;
    },
  },
  actions: {
    async Login({ dispatch, commit }, usuario) {
      try {
        this.loading = true;
        const result = await axios.post("/auth/login", {
          usuario: usuario.user,
          password: usuario.psw,
        });
        const token = result.data.token;
        dispatch("setLocalToken", token);
        const now = new Date();
        const expira = now.getTime() + 86400000; //24h
        localStorage.setItem("expira", expira);

        //setear usuario global
        // const rol = dispatch("buscarRol", result.data.rol);
        const rol = buscarRol(result.data.rol);
        const nombre = result.data.nombre;
        const globaluser = { nombre: nombre, rol: rol };
        dispatch("setGlobalUser", globaluser);

        commit("setCurrentUsername", nombre);
        commit("setCurrentRol", rol);

        dispatch(
          "noti/agregarNotificacionExitosa",
          "Inició sesión correctamente"
        );
        router.push("/");
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg);
      }
    },
    buscarRol(roles) {
      let rol = null;
      if (roles) {
        roles = roles.map(function(rol) {
          return rol.nombre;
        });
        const dfound = roles.find((r) => r === "director");
        const cfound = roles.find((r) => r === "coordinador");
        const pfound = roles.find((r) => r === "profesor");
        if (dfound) rol = "Director";
        else if (cfound) rol = "Coordinador";
        else if (pfound) rol = "Profesor";
      }
      return rol;
    },
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
    leerGlobalUser({ commit }) {
      const nombre = localStorage.getItem("usuario");
      const rol = localStorage.getItem("rol");
      commit("setCurrentUsername", nombre);
      commit("setCurrentRol", rol);
    },
    setGlobalUser({ commit }, user) {
      localStorage.setItem("usuario", user.nombre);
      localStorage.setItem("rol", user.rol);
      commit("setCurrentUsername", user.nombre);
      commit("setCurrentRol", user.rol);
    },
    readbadnotifications({ dispatch }, error) {
      let errores = [];
      if (error.response.data.msg) {
        errores = error.response.data.msg;
      }
      if (errores.length > 0) {
        errores.forEach((e) => {
          dispatch("noti/agregarNotificacionErronea", e);
        });
      } else {
        dispatch("noti/agregarNotificacionErronea", null);
      }
    },
  },
  modules: {
    usuario: usuarioStore,
    noti: NotificationStore,
    proyecto: proyectoStore,
  },
});
