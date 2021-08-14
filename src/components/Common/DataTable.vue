<template>
  <v-card class="px-5">
    <v-data-table
      :loading="loading"
      loading-text="Cargando, por favor espere"
      no-data-text="No existen datos"
      no-results-text="No hay coincidencias"
      :headers="cabecera"
      :items="valores"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ titulo }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="labelbusqueda"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click.stop="showdetailItem(item)" icon>
          <v-icon small color="primary"> mdi-open-in-new </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Addbutton from "@/components/Common/Addbutton.vue";
export default {
  name: "Datatable",
  components: {
    Addbutton,
  },
  props: {
    titulo: String,
    labelbusqueda: String,
    cabecera: Array,
    valores: Array,
    loading: Boolean,
    tipodedato: String,
  },
  data() {
    return {
      search: "",
      itemId: 0,
    };
  },
  methods: {
    showdetailItem(item) {
      //console.log(item._id);
      if (this.tipodedato === "usuario") {
        this.$router.push({ name: "UserDetail", params: { id: item._id } });
      } else if (this.tipodedato === "proyecto") {
        this.$router.push({ name: "ProyectDetalle", params: { id: item._id } });
      }
    },
  },
};
</script>