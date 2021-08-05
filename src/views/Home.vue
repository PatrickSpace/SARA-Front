<template>
  <DefaultLayout v-bind:titulo="titulo">
    <section slot="contenido">
      <p class="text-body1">Bienvenido a S.A.R.A</p>
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
    };
  },
};
</script>

<style>
</style>