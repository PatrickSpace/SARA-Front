import Vue from "vue";
import Vuetify from "vuetify/lib";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: "#00707e",
        secondary: "#F7A713",
      },
    },
  },
});
