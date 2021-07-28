<template>
  <Defaultlayout>
    <section slot="contenido">
      <div class="container">
        <h2>Preguntas</h2>
        <v-switch v-model="ispdf" :label="changelabelpdf"></v-switch>
        <Inferencia v-bind:pdf="ispdf" />
      </div>
    </section>
  </Defaultlayout>
</template>

<script>
import Inferencia from "@/components/Inferencia.vue";
import Defaultlayout from "@/layouts/Defaultlayout.vue";
export default {
  name: "Preguntas",
  data() {
    return {
      ispdf: true,
    };
  },
  components: {
    Inferencia,
    Defaultlayout,
  },
  computed: {
    changelabelpdf() {
      if (this.ispdf === false) {
        return "Texto";
      } else return "PDF";
    },
  },
};
</script>