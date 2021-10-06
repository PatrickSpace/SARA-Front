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
        <v-card-title> Agregar un nuevo usuario </v-card-title>
        <v-form
          ref="form"
          v-model="validlogin"
          @submit.prevent="edituser()"
          class="px-3"
        >
          <v-card-text class="pt-2">
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-card-account-details"
              v-model="usuario.nombre"
              counter="50"
              clearable
              :rules="rules.nombreRules"
              label="Nombre completo"
              required
            ></v-text-field>
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-account"
              v-model="usuario.usuario"
              counter="30"
              clearable
              :rules="rules.userRules"
              label="Nombre de usuario"
              required
            ></v-text-field>
            <v-select
              :loading="loading"
              prepend-inner-icon="mdi-account-box-multiple"
              v-model="select"
              :items="roles"
              item-text="texto"
              item-value="valor"
              label="Rol"
              return-object
              single-line
              required
              :rules="rules.rolRules"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text dark @click="cancelar()"> Cancelar </v-btn>
            <v-btn color="primary" text :loading="loading" type="submit">
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
  name: "edituser",
  props: {
    usuariofromcomponent: Object,
  },
  data() {
    return {
      editdialog: false,
      validlogin: true,
      loading: false,
      select: null,
      roles: [
        { texto: "Profesor", valor: ["profesor"] },
        { texto: "Coordinador", valor: ["profesor", "coordinador"] },
        { texto: "Director", valor: ["profesor", "coordinador", "director"] },
      ],
      usuario: {
        nombre: "",
        usuario: "",
        roles: [],
      },
      rules: {
        nombreRules: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length <= 50) ||
            "Este campo debe contener como máximo 50 caracteres",
          (v) =>
            !/[^a-zA-Z ]+/.test(v) || "Este campo solo debe contener letras",
        ],
        userRules: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length <= 30) ||
            "Este campo debe contener como máximo 30 caracteres",
        ],
        rolRules: [(v) => !!v || "Este campo es obligatorio"],
      },
    };
  },
  methods: {
    cancelar() {
      this.editdialog = false;
      this.$refs.form.reset();
    },
  },
  mounted() {
    const { nombre, rol, username } = this.usuariofromcomponent;
    this.usuario.nombre = nombre;
    this.usuario.usuario = username;
    switch (rol) {
      case "Profesor":
        this.select = { texto: "Profesor", valor: ["profesor"] };
        break;
      case "Coordinador":
        this.select = {
          texto: "Coordinador",
          valor: ["profesor", "coordinador"],
        };
      case "Director":
        this.select = {
          texto: "Director",
          valor: ["profesor", "coordinador", "director"],
        };
      default:
        this.select = { texto: "Profesor", valor: ["profesor"] };
        break;
    }
  },
};
</script>