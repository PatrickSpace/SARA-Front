import axios from "axios";

const apiobject = "/proyecto";

export default {
  namespaced: true,
  state: {
    proyectos: [],
  },
  getters: {
    getAllProyectos: (state) => state.proyectos,
  },
  mutations: {
    updateAllProyectos: (state, payload) => (state.proyectos = payload),
  },
  actions: {
    async getProyectos({ commit, dispatch }) {
      try {
        const result = await axios.get(apiobject);
        const proyectos = result.data.items;
        commit("updateAllProyectos", proyectos);
        dispatch("noti/agregarNotificacionExitosa", "Proyectos recuperados", {
          root: true,
        });
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async getProyectobyId({ commit, dispatch }, id) {
      const url = apiobject + "/" + id; //url/api/proyecto/id
      try {
        const result = await axios.get(url);
        const proyecto = result.data.proyectofound;
        dispatch("noti/agregarNotificacionExitosa", "Proyecto recuperado", {
          root: true,
        });
        return proyecto;
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async Addproyecto({ dispatch }, proyecto) {
      try {
        await axios.post(apiobject, proyecto);
        dispatch("noti/agregarNotificacionExitosa", "Proyecto recuperado", {
          root: true,
        });
        dispatch("getProyectos");
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        console.log(error);
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async DeleteProject({ dispatch }, id) {
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
  },
};
