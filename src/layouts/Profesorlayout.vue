<template>
  <v-app>
    <Navbar v-bind:title="titlevalue" />
    <v-main>
      <slot name="contenido"></slot>
    </v-main>
  </v-app>
</template>
<script>
import Navbar from "@/components/Nav/Navbar.vue";
export default {
  name: "ProfesorLayout",
  data() {
    return {
      titlevalue: "Profesor",
    };
  },
  components: {
    Navbar,
  },
};
</script>
