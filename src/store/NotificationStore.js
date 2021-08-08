export default {
  namespaced: true,
  state: {
    notifications: [{ visible: false }],
  },
  getters: {
    getNotifications: (state) => state.notifications,
  },
  mutations: {
    addNotification: (state, payload) => {
      payload.visible = true;
      state.notifications.push(payload);
      state.notifications.push({ visible: false }); //esto es para simular un cambio de estado en el array y que se produzca la animacion
    },

    hidenoification: (state, i) => {
      state.notifications[i].visible = false;
    },
    removeHidedNotifications: (state) => {
      const newnotis = state.notifications.filter(
        (noti) => noti.visible === true
      );
      state.notifications = newnotis;
    },
  },
  actions: {
    agregarNotificacion: ({ commit }, payload) => {
      commit("removeHidedNotifications");
      commit("addNotification", payload);
    },
    ocultarNotificacion: ({ commit }, payload) => {
      commit("hidenoification", payload);
    },
    agregarNotificacionExitosa: ({ commit }, msg) => {
      if (msg === null) msg = "Operación realizada exitosamente";
      const notificacion = {
        tipo: "success",
        color: "green",
        msg: msg,
      };
      commit("removeHidedNotifications");
      commit("addNotification", notificacion);
    },
    agregarNotificacionErronea: ({ commit }, msg) => {
      if (msg === null) msg = "Ocurrió un error, intentelo de nuevo";
      const notificacion = {
        tipo: "error",
        color: "red",
        msg: msg,
      };
      commit("removeHidedNotifications");
      commit("addNotification", notificacion);
    },
  },
};
