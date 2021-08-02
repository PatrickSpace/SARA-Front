const apiobject = "/user";
export default {
  namespaced: true,
  state: {
    usuarios: [],
  },
  getters: {
    getUsuarios: (state) => state.usuarios,
  },
  mutations: {
    setUsuarios(state, payload) {
      state.usuarios = payload;
    },
  },
  actions: {
    async getAllusers({ commit }) {
      const url = apiobject;
      try {
        const result = await axios.get(url, Headers);
        const usuarios = result.data.items.map((user) => {
          user.proyectos = user.proyectos.length;
          return user;
        });
        commit("setUsuarios", usuarios);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    getUserbyID() {},
  },
};
