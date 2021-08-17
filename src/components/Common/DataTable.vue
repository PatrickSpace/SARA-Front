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
        <v-btn @click.stop="deleteItem(item)" icon>
          <v-icon small color="red"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Addbutton from "@/components/Common/Addbutton.vue";
import { mapActions } from "vuex";
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
      cargar: false,
    };
  },
  methods: {
    ...mapActions({
      borraritem: "usuario/borrarUsuario",
    }),
    showdetailItem(item) {
      if (this.tipodedato === "usuario") {
        this.$router.push({ name: "UserDetail", params: { id: item._id } });
      } else if (this.tipodedato === "proyecto") {
        this.$router.push({ name: "ProyectDetalle", params: { id: item._id } });
      }
    },
    deleteItem() {
      if (this.tipodedato === "usuario") {
      } else if (this.tipodedato === "proyecto") {
      }
    },
  },
};
</script>