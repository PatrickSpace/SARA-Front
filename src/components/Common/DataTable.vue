<template>
  <v-card class="px-5">
    <v-card-title>
      {{ titulo }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="labelbusqueda"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      loading-text="Cargando, por favor espere"
      no-data-text="No existen datos"
      no-results-text="No hay coincidencias"
      :headers="cabecera"
      :items="valores"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "Datatable",
  props: {
    titulo: String,
    labelbusqueda: String,
    cabecera: Array,
    valores: Array,
    loading: Boolean,
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>