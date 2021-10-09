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
    async getmyProyectos({ dispatch }, id) {
      const url = apiobject + "/my/" + id;
      try {
        const result = await axios.get(url);
        const proyectos = result.data.proyectos;
        console.log(result);
        return proyectos;
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },
    async getProyectobyId({ dispatch }, id) {
      const url = apiobject + "/" + id;
      try {
        const result = await axios.get(url);
        const proyecto = result.data.proyectofound;
        return proyecto;
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
        router.go(-1);
      }
    },
    async Addproyecto({ dispatch }, proyecto) {
      try {
        const result = await axios.post(apiobject, proyecto);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
        dispatch("getProyectos");
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },

    async updateproyecto({ dispatch }, payload) {
      const url = apiobject + "/" + payload.id;
      try {
        const proyectos = { codigo: payload.codigo, nombre: payload.nombre };
        const result = await axios.put(url, proyectos);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
      } catch (error) {
        dispatch("readbadnotifications", error, { root: true });
      }
    },
    async DeleteProject({ dispatch }, id) {
      const url = apiobject + "/" + id;
      try {
        const result = await axios.delete(url);
        console.log(result);
        dispatch("noti/agregarNotificacionExitosa", result.data.msg, {
          root: true,
        });
        dispatch("getProyectos");
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
    async uploadDoc({ dispatch }, payload) {
      const url = apiobject + "/upload/" + payload.id;
      try {
        var body = new FormData();
        body.append("document", payload.documento);
        const result = await axios({
          method: "post",
          url: url,
          data: body,
          headers: { "Content-Type": "multipart/form-data" },
        });
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
    async realizarPregunta({ dispatch }, payload) {
      const url = "/analisis/preguntar/" + payload.id;
      try {
        const result = await axios.post(url, { pregunta: payload.Pregunta });
        return result.data;
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
    async saveCalificacion({ dispatch }, payload) {
      const url = "/calificacion/";
      try {
        const result = await axios.post(url, payload);
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
