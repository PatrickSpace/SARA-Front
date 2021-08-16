<template>
  <Defaultlayout v-bind:titulo="titulo">
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
      titulo: "Detalle del proyecto",
      id: this.$route.params.id,
    };
  },
  computed:{
   
  }
};
</script>