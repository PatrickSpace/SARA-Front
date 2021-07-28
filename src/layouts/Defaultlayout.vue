<template>
  <v-app app>
    <Navdrawer />
    <Navbar />
    <v-main>
      <slot name="contenido"></slot>
    </v-main>
  </v-app>
</template>
<script>
import Navdrawer from "@/components/Nav/Navdrawer.vue";
import Navbar from "@/components/Nav/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "ProfesorLayout",
  components: {
    Navdrawer,
    Navbar,
  },
  data() {
    return {
      title: "Profesor",
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>