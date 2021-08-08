<template>
  <DefaultLayout v-bind:titulo="titulo">
    <section slot="contenido">
      <p class="text-body1">Bienvenido a S.A.R.A</p>
      <p class="text-body-1">El token de sesión expira en: {{ expiraen }}</p>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/Defaultlayout.vue";
export default {
  name: "Home",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      titulo: "Home",
      expiraen: 0,
    };
  },
  mounted() {
    const now = new Date();
    this.expiraen = localStorage.getItem("expira") - now.getTime();
  },
};
</script>

<style>
</style>