<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="proyectosbyprofes"
        v-bind:loading="loading"
        v-bind:tipodedato="tipo"
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
      titulo: "Mis Proyectos",
      tableTitulo: "Proyectos asignados",
      labelbusqueda: "Buscar por nombre o codigo",
      proyectosbyprofes: [],
      loading: false,
      tipo: "proyecto",
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Codigo", value: "codigo" },
        { text: "Detalle", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions({
      obtenerproyectosfromAPI: "proyecto/getmyProyectos",
    }),
    obtenerproyectos: async function () {
      try {
        this.loading = true;
        const id = this.getcurrentUser.id;
        this.proyectosbyprofes = await this.obtenerproyectosfromAPI(id);
        console.log(this.proyectosbyprofes);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getProyectos: "proyecto/getmyProyectos",
      getcurrentUser: "getCurrentUser",
    }),
  },
  created() {
    this.obtenerproyectos();
  },
};
</script>