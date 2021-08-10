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
        <v-icon class="mr-2" @click="editItem(item)" color="primary">
          mdi-pencil
        </v-icon>
        <v-icon @click.stop="showdeldialog(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="py-2">
        <v-card-title class="text-h5"> Advertencia </v-card-title>
        <v-card-text>
          Esta acción borrará permanentemente el item seleccionado. ¿Desea
          continuar?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteItem()">
            Borrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
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
    deleteRoute: String,
  },
  data() {
    return {
      search: "",
      dialog: false,
      itemId: 0,
    };
  },
  methods: {
    editItem(item) {
      console.log(item._id);
    },
    deleteItem() {
      console.log(this.itemId);
    },
    showdeldialog(item) {
      this.dialog = true;
      this.itemId = item._id;
    },
    ...mapActions({
      deletefromAPI: deleteRoute,
    }),
  },
};
</script>