const apiobject = "/user";

export default {
  namespaced: true,
  state: {
    usuarios: [],
    profesores: [],
    directores: [],
    coordinadores: [],
  },
  getters: {
    getUsuarios: (state) => state.usuarios,
    getProfesores: (state) => state.profesores,
    getCoordinadores: (state) => state.coordinadores,
    getDirectores: (state) => state.directores,
  },
  mutations: {
    setUsuarios(state, payload) {
      state.usuarios = payload;
    },
    setProfesores(state, payload) {
      state.profesores = payload;
    },
    setCoordinadores(state, payload) {
      state.coordinadores = payload;
    },
    setDirectores(state, payload) {
      state.directores = payload;
    },
  },
  actions: {
    async getProfesores({ commit, dispatch }) {
      const url = apiobject + "/profesores";
      try {
        const result = await axios.get(url);
        const usuarios = result.data.items.map((user) => {
          user.proyectos = user.proyectos.length;
          return user;
        });
        commit("setProfesores", usuarios);
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async getCoordinadores({ commit, dispatch }) {
      const url = apiobject + "/coordinadores";
      try {
        const result = await axios.get(url);
        const usuarios = result.data.items;
        commit("setCoordinadores", usuarios);
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async getDirectores({ commit, dispatch }) {
      const url = apiobject + "/directores";
      try {
        const result = await axios.get(url);
        commit("setDirectores", result.data.items);
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async getUserbyID({ dispatch }, id) {
      const url = apiobject + "/" + id;
      try {
        const result = await axios.get(url);
        const usuario = result.data;
        dispatch("noti/agregarNotificacionExitosa", "Usuario recuperado", {
          root: true,
        });
        console.log(usuario);
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async borrarUsuario({ dispatch }, id) {
      const url = apiobject + "/" + id;
      try {
        const result = await axios.delete(url);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        let errores = [];
        if (error.response.data.msg) {
          errores = error.response.data.msg;
        }
        if (errores.length > 0) {
          errores.forEach((e) => {
            dispatch("noti/agregarNotificacionErronea", e, {
              root: true,
            });
          });
        } else {
          dispatch("noti/agregarNotificacionErronea", null, { root: true });
        }
      }
    },
    updateUsuario() {},
    async addUsuario({ dispatch }, usuario) {
      try {
        const result = await axios.post(apiobject, usuario);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        let errores = [];
        if (error.response.data.msg) {
          errores = error.response.data.msg;
        }
        if (errores.length > 0) {
          errores.forEach((e) => {
            dispatch("noti/agregarNotificacionErronea", e, {
              root: true,
            });
          });
        } else {
          dispatch("noti/agregarNotificacionErronea", null, { root: true });
        }
      }
    },
  },
};
