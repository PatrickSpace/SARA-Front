<template>
  <Defaultlayout>
    <section slot="contenido">
      <div class="container">
        <Summary />
      </div>
    </section>
  </Defaultlayout>
</template>
<script>
import Summary from "@/components/Summary.vue";
import Defaultlayout from "@/layouts/Defaultlayout.vue";
export default {
  name: "resumen",
  components: {
    Summary,
    Defaultlayout,
  },
};
</script>