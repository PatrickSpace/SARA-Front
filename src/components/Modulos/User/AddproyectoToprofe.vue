<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click.stop="addprojectdialog = true"
          v-bind="attrs"
          v-on="on"
          fab
          dark
          small
          color="indigo"
        >
          <v-icon>mdi-playlist-plus</v-icon>
        </v-btn>
      </template>
      <span>Asignar proyecto</span>
    </v-tooltip>
    <v-dialog v-model="addprojectdialog" max-width="600" persistent>
      <v-card class="pa-3">
        <v-card-title> Asignar un proyecto </v-card-title>
        <v-data-table
          v-model="proyectos"
          loading-text="Cargando, por favor espere"
          no-data-text="No existen datos"
          no-results-text="No hay coincidencias"
          :headers="headers"
          :items="getProyectos"
          item-key="codigo"
          show-select
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="labelbusqueda"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="addprojectdialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click.stop="asignar()">
            Asignar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addproyectotoprofe",
  props: {
    id: String,
  },
  data() {
    return {
      addprojectdialog: false,
      titulo: "Proyectos",
      tableTitulo: "Todos los proyectos",
      labelbusqueda: "Buscar por nombre o codigo",
      search: "",
      loading: false,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Codigo", value: "codigo" },
      ],
      proyectos: [],
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
    asignar() {},
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
