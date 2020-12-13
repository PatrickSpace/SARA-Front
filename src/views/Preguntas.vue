<template>
  <div class="container">
    <h2>Preguntas</h2>
    <v-switch
      v-model="ispdf"
      :label="changelabelpdf"
    ></v-switch>
    <Inferencia v-bind:pdf="ispdf" />
  </div>
</template>

<script>
import Inferencia from "@/components/Inferencia.vue";
export default {
  name: "Preguntas",
  data() {
    return {
      ispdf: true,
    };
  },
  components: {
    Inferencia,
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