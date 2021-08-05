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
  name: "Alldirectores",
  components: {
    Datatable,
    Defaultlayout,
  },
  data() {
    return {
      titulo: "Directores",
      loading: false,
      tableTitulo: "Todos los directores",
      labelbusqueda: "Buscar por nombre",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Usuario", value: "usuario" },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsersfromapi: "usuario/getDirectores",
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
      getUsers: "usuario/getDirectores",
    }),
  },
  created() {
    this.obtenenerdatos();
  },
};
</script>