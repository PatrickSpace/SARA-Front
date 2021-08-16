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
  name: "Allcoordinadores",
  components: {
    Datatable,
    Defaultlayout,
    Adduser,
  },
  data() {
    return {
      titulo: "Coordinadores",
      loading: false,
      tableTitulo: "Todos los coordinadores",
      labelbusqueda: "Buscar por nombre",
      tipo: "usuario",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Usuario", value: "usuario" },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsersfromapi: "usuario/getCoordinadores",
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
      getUsers: "usuario/getCoordinadores",
    }),
  },
  created() {
    this.obtenenerdatos();
  },
};
</script>