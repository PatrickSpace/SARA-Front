<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="getUsers"
        v-bind:loading="loading"
        v-bind:tipodedato="tipo"
      />
      <Adduser />
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import Datatable from "@/components/Common/DataTable.vue";
import Adduser from "@/components/Modulos/User/Adduser.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Allusers",
  components: {
    Datatable,
    Defaultlayout,
    Adduser,
  },
  data() {
    return {
      titulo: "Profesores",
      loading: false,
      tableTitulo: "Todos los profesores",
      labelbusqueda: "Buscar por nombre",
      tipo: "usuario",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Usuario", value: "usuario" },
        { text: "Cantidad de proyectos", value: "proyectos" },
        { text: "Detalle", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsersfromapi: "usuario/getProfesores",
    }),
    async obtenenerdatos() {
      try {
        this.loading = true;
        await this.getUsersfromapi();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getUsers: "usuario/getProfesores",
    }),
  },
  created() {
    this.obtenenerdatos();
  },
};
</script>