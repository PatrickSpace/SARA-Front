<template>
  <Defaultlayout titulo="proyecto by id">
    <section slot="contenido">
      <h1>proyectos N°: {{ id }}</h1>
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
export default {
  name: "ProyectobyId",
  components: {
    Defaultlayout,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>