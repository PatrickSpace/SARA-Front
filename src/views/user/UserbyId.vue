<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <div v-if="loading">
        <v-row>
          <v-col xl="6" md="5" sm="12">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </v-col>
          <v-col xl="6" md="7" sm="12">
            <v-skeleton-loader
              type="article, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div v-if="!loading">
        <h1>usuario: {{ $route.params.id }}</h1>
        <ActionFButton v-bind:id="id" tipo="user" />
      </div>
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import ActionFButton from "@/components/Common/ActionFButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserbyId",
  components: {
    Defaultlayout,
    ActionFButton,
  },
  data() {
    return {
      titulo: "Detalle del usuario",
      loading: false,
      proyecto: {
        nombre: "",
        codigo: "",
      },
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({ getUsuariobyID: "usuario/getUserbyID" }),
    getUser(id) {
      try {
        this.loading = true;
        this.getUsuariobyID(id);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({ rol: "getCurrentUserRol" }),
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>