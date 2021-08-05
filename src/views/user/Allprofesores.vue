<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="getUsers"
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
  name: "Allusers",
  components: {
    Datatable,
    Defaultlayout,
  },
  data() {
    return {
      aux: [],
      titulo: "Profesores",
      loading: false,
      tableTitulo: "Todos los profesores",
      labelbusqueda: "Buscar por nombre",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Usuario", value: "usuario" },
        { text: "Cantidad de proyectos", value: "proyectos" },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsersfromapi: "usuario/getProfesores",
      addnoti: "noti/agregarNotificacion",
    }),
    async obtenenerdatos() {
      try {
        this.loading = true;
        const notificacion = await this.getUsersfromapi();
        this.addnoti(notificacion);
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