<template>
  <DefaultLayout v-bind:titulo="titulo">
    <section slot="contenido">
      <v-card class="mx-auto pa-10" max-width="500">
        <v-card-text>
          <p class="text-h3 text--primary">404 not found</p>
          <div class="text--primary">
            Al parecer ha accedido a una ruta no definida, por favor vuelva al
            inicio.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn dark color="teal " to="/"> Volver al inicio </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
          >
            <v-card-text class="pb-0">
              <p class="text-h4 text--primary">Origin</p>
              <p>
                late 16th century (as a noun denoting a place where alms were
                distributed): from medieval Latin eleemosynarius, from late
                Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn text color="teal accent-4" @click="reveal = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/Defaultlayout.vue";
export default {
  components: {
    DefaultLayout,
  },
};
</script>

<style scoped>
#4040div {
  align-items: center;
  display: flex;
}
</style>