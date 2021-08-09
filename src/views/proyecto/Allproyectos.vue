<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="getProyectos"
        v-bind:loading="loading"
      />
    </section>
  </Defaultlayout>
</template>

<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import Datatable from "@/components/Common/DataTable.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Allproyectos",
  components: {
    Defaultlayout,
    Datatable,
  },
  data() {
    return {
      titulo: "Proyectos",
      tableTitulo: "Todos los proyectos",
      labelbusqueda: "Buscar por nombre o codigo",
      loading: false,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Codigo", value: "cod" },
      ],
    };
  },
  methods: {
    ...mapActions({
      obtenerproyectosfromAPI: "proyecto/getProyectos",
    }),
    obtenerproyectos: function () {
      try {
        this.loading = true;
        this.obtenerproyectosfromAPI();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getProyectos: "proyecto/getAllProyectos",
    }),
  },
  created() {
    this.obtenerproyectos();
  },
};
</script>