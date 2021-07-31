<template>
  <Defaultlayout>
    <section slot="contenido">
      <h1>proyectos N°:</h1>
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
     // id: $route.params.id,
    };
  },
};
</script>