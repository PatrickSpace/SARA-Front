import axios from "axios";
import router from "@/router";
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
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
      }
    },
    async getProyectobyId({ dispatch }, id) {
      const url = apiobject + "/" + id;
      try {
        const result = await axios.get(url);
        const proyecto = result.data.proyectofound;

        return proyecto;
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        dispatch("noti/agregarNotificacionErronea", msg, { root: true });
        router.go(-1);
      }
    },
    async Addproyecto({ dispatch }, proyecto) {
      try {
        await axios.post(apiobject, proyecto);
        dispatch(
          "noti/agregarNotificacionExitosa",
          "Proyecto agregado exitosamente",
          {
            root: true,
          }
        );
        dispatch("getProyectos");
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
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
