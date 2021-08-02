<template>
  <v-app app>
    <Navdrawer />
    <Navbar v-bind:title="title" />
    <v-main class="main">
      <v-container class="pt-10">
        <h4 class="text-h4">{{ titulo }}</h4>
        <v-divider class="mb-10"></v-divider>
        <slot name="contenido"></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
.main {
  background-color: rgb(250, 250, 250);
}
</style>
<script>
import Navdrawer from "@/components/Nav/Navdrawer.vue";
import Navbar from "@/components/Nav/Navbar.vue";

export default {
  name: "ProfesorLayout",
  components: {
    Navdrawer,
    Navbar,
  },
  props: {
    titulo: String,
  },
  data() {
    return {
      title: "Sistema para la Automatización de Revisión y Analisis de tesis",
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>