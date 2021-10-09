const apiobject = "/user";
import router from "@/router";

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
      let usuario = undefined;
      try {
        const result = await axios.get(url);
        usuario = await result.data.items;
        usuario.rol = buscarRol(usuario.roles);
        return usuario;
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
        router.push({ name: "Profesores" });
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
        dispatch("readbadnotifications", error, { root: true });
        router.push({ name: "Profesores" });
      }
    },
    async updateUsuario({ dispatch }, payload) {
      const url = apiobject + "/" + payload.id;
      try {
        const result = await axios.put(url, payload.usuario);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },
    async addUsuario({ dispatch }, usuario) {
      try {
        const result = await axios.post(apiobject, usuario);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },
    async asignProyecttouser({ dispatch }, payload) {
      const url = apiobject + "/asignar/" + payload.id;
      try {
        const result = await axios.put(url, { ids: payload.projids });
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },
  },
};
