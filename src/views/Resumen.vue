<template>
  <Profelayout>
    <section slot="contenido">
      <div class="container">
        <Summary />
      </div>
    </section>
  </Profelayout>
</template>
<script>
import Summary from "@/components/Summary.vue";
import Profelayout from "@/layouts/Profesorlayout.vue";
export default {
  name: "resumen",
  components: {
    Summary,
    Profelayout,
  },
};
</script>