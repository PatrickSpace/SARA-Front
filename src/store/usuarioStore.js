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
    async getAllusers({ commit }) {
      const url = apiobject;
      let notificacion = null;
      try {
        const result = await axios.get(url, Headers);
        const usuarios = result.data.items.map((user) => {
          user.proyectos = user.proyectos.length;
          return user;
        });
        commit("setUsuarios", usuarios);
        notificacion = {
          tipo: "success",
          color: "green",
          msg: "Usuarios recuperados",
        };
      } catch (error) {
        let msg = "OCurrió un error";
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        notificacion = {
          tipo: "error",
          color: "red",
          msg: msg,
        };
        console.log(error.data);
      }
      return notificacion;
    },
    async getProfesores({ commit }) {
      const url = apiobject + "/profesores";
      let notificacion = null;
      try {
        const result = await axios.get(url);
        const usuarios = result.data.items.map((user) => {
          user.proyectos = user.proyectos.length;
          return user;
        });
        commit("setProfesores", usuarios);
        notificacion = {
          tipo: "success",
          color: "green",
          msg: "Profesores recuperados",
        };
      } catch (error) {
        let msg = "OCurrió un error";
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        notificacion = {
          tipo: "error",
          color: "red",
          msg: msg,
        };
        console.log(error.data);
      }
      return notificacion;
    },
    async getCoordinadores({ commit }) {
      const url = apiobject + "/coordinadores";
      let notificacion = null;
      try {
        const result = await axios.get(url);
        const usuarios = result.data.items;
        commit("setCoordinadores", usuarios);
        notificacion = {
          tipo: "success",
          color: "green",
          msg: "Coordinadores recuperados",
        };
      } catch (error) {
        let msg = "OCurrió un error";
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        notificacion = {
          tipo: "error",
          color: "red",
          msg: msg,
        };
        console.log(error.data);
      }
      return notificacion;
    },
    async getDirectores({ commit }) {
      const url = apiobject + "/directores";
      let notificacion = null;
      try {
        const result = await axios.get(url);
        const usuarios = result.data.items;
        commit("setDirectores", usuarios);
        notificacion = {
          tipo: "success",
          color: "green",
          msg: "Directores recuperados",
        };
      } catch (error) {
        let msg = "OCurrió un error";
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        notificacion = {
          tipo: "error",
          color: "red",
          msg: msg,
        };
        console.log(error.data);
      }
      return notificacion;
    },
    getUserbyID() {},
  },
};
