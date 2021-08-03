export default {
    namespaced: true,
    state: {
        notifications: []
    },
    getters: {
        getNotifications: (state) => state.notifications
    },
    mutations: {
        addNotification: (state) => state.notifications.push,
        removeNotification: (state, index) => state.notifications.splice(index, 1),
        updateNotifications: (state, payload) => { state.notifications = payload },
    },
    actions: {
        agregarNotificacion: ({ commit }) => {
            commit("addNotification")
        }
    }
}