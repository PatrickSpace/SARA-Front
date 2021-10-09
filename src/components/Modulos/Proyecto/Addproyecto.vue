<template>
  <v-fade-transition>
    <section>
      <v-btn
        color="primary"
        fab
        dark
        fixed
        bottom
        right
        @click.stop="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="450" persistent>
        <v-card class="pa-3">
          <v-card-title> Agregar un nuevo proyecto </v-card-title>
          <v-form
            ref="form"
            v-model="validlogin"
            @submit.prevent="addproyecto()"
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
    </section>
  </v-fade-transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Adduser",
  props: {
    tipo: String,
  },
  data() {
    return {
      dialog: false,
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
    ...mapActions({
      addProjectfromAPI: "proyecto/Addproyecto",
    }),
    async addproyecto() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await this.addProjectfromAPI(this.proyecto);
          this.cancelar();
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      }
    },
    cancelar() {
      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>