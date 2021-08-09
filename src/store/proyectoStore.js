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
    getProyectos({ commit }) {
      const proyectos = [{ nombre: "Proyecto 1", cod: 1 }];
      //peticion hhtp
      axios.get(apiobject);
      commit("updateAllProyectos", proyectos);
    },
  },
};
