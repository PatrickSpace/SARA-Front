<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click.stop="editdialog = true"
          v-bind="attrs"
          v-on="on"
          fab
          dark
          small
          color="blue"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Editar</span>
    </v-tooltip>
    <v-dialog v-model="editdialog" max-width="450" persistent>
      <v-card class="pa-3">
        <v-card-title> Agregar un nuevo proyecto </v-card-title>
        <v-form
          ref="form"
          v-model="validlogin"
          @submit.prevent="editproyecto()"
          class="px-3"
        >
          <v-card-text class="pt-2">
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-alphabetical-variant"
              v-model="proyecto.nombre"
              counter="50"
              clearable
              :rules="nameRules"
              label="Nombre del proyecto"
              required
            ></v-text-field>
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-identifier"
              v-model="proyecto.codigo"
              counter="30"
              clearable
              :rules="codRules"
              label="Código"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="cancelar()"> Cancelar </v-btn>
            <v-btn color="primary" :loading="loading" type="submit">
              Agregar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Editproyecto",
  props: {
    proyectofromcomponent: Object,
  },
  data() {
    return {
      editdialog: false,
      validlogin: true,
      loading: false,
      proyecto: {
        nombre: "",
        codigo: "",
      },
      nameRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length <= 50) ||
          "Este campo debe contener como máximo 50 caracteres",
        (v) =>
          (v && v.length >= 5) ||
          "Este campo debe contener como mínimo 5 caracteres",
      ],
      codRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length >= 5) ||
          "Este campo debe contener como mínimo 5 caracteres",
        (v) =>
          (v && v.length <= 30) ||
          "Este campo debe contener como máximo 30 caracteres",
      ],
    };
  },
  methods: {
    cancelar() {
      this.editdialog = false;
      this.$refs.form.reset();
    },
    getProyectoByID() {
      try {
        const { nombre, codigo } = this.proyectofromcomponent;
        this.proyecto.nombre = nombre;
        this.proyecto.codigo = codigo;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getProyectoByID();
  },
};
</script>
