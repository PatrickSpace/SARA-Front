<template>
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
        <v-card-title> Agregar un nuevo usuario </v-card-title>
        <v-form
          ref="form"
          v-model="validlogin"
          @submit.prevent="adduser()"
          class="px-3"
        >
          <v-card-text class="pt-2">
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-account"
              v-model="usuario.nombre"
              counter
              clearable
              :rules="userRules"
              label="Nombre completo"
              required
            ></v-text-field>
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-account"
              v-model="usuario.usuario"
              counter
              clearable
              :rules="userRules"
              label="Nombre de usuario"
              required
            ></v-text-field>
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-lock"
              v-model="usuario.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="pswRules"
              label="Contraseña"
              clearable
              required
              @click:append="show = !show"
            ></v-text-field>
            <v-select
              :loading="loading"
              prepend-inner-icon="mdi-account"
              v-model="select"
              :items="roles"
              item-text="texto"
              item-value="valor"
              label="Rol"
              return-object
              single-line
              required
              :rules="userRules"
            ></v-select>
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
      show: false,
      select: null,
      roles: [
        { texto: "Profesor", valor: ["profesor"] },
        { texto: "Coordinador", valor: ["profesor", "coordinador"] },
        { texto: "Director", valor: ["profesor", "coordinador", "director"] },
      ],
      usuario: {
        nombre: "bert",
        usuario: "ed",
        password: "pass",
        roles: ["profesor"],
      },
      userRules: [(v) => !!v || "Este campo es obligatorio"],
      pswRules: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    ...mapActions({
      addUserfromAPI: "usuario/addUsuario",
      getProfesores: "usuario/getProfesores",
      getDirectores: "usuario/getDirectores",
      getCoordinadores: "usuario/getCoordinadores",
    }),
    async adduser() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          if (this.select != null) this.usuario.roles = this.select.valor;
          const usuariotoadd = JSON.stringify(this.usuario);
          await this.addUserfromAPI(usuariotoadd);
          this.cancelar();
          if (this.select.texto) {
            switch (this.select.texto) {
              case "Profesor":
                this.getProfesores();
                break;
              case "Director":
                this.getDirectores();
                break;
              case "Coordinador":
                this.getCoordinadores();
              default:
                this.getProfesores();
                this.getDirectores();
                this.getCoordinadores();
                break;
            }
          }
        } catch (e) {
          console.log(e.response);
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