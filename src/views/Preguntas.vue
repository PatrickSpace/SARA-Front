<template>
  <Profelayout>
    <section slot="contenido">
      <div class="container">
        <h2>Preguntas</h2>
        <v-switch v-model="ispdf" :label="changelabelpdf"></v-switch>
        <Inferencia v-bind:pdf="ispdf" />
      </div>
    </section>
  </Profelayout>
</template>

<script>
import Inferencia from "@/components/Inferencia.vue";
import Profelayout from "@/layouts/Profesorlayout.vue";
export default {
  name: "Preguntas",
  data() {
    return {
      ispdf: true,
    };
  },
  components: {
    Inferencia,
    Profelayout,
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