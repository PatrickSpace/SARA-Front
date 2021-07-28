<template>
  <v-app>
    <v-main class="d-flex align-center" tag="div">
      <v-card class="mx-auto my-auto px-5 py-10" max-width="400">
        <v-card-title>Iniciar sesión</v-card-title>
        <v-form ref="form" v-model="validlogin" @submit.prevent="login()">
          <v-container>
            <v-text-field
              prepend-inner-icon="mdi-account"
              v-model="user"
              counter
              clearable
              :rules="userRules"
              label="Usuario"
              required
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              v-model="psw"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="pswRules"
              label="Contraseña"
              clearable
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-container>
          <v-card-actions>
            <v-btn class="primary" type="submit" block>Ingresar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-snackbar color="error" v-model="snackbar" timeout="6000">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Loginview",
  data: () => {
    return {
      validlogin: true,
      show: false,
      snackbar: false,
      msg: "",
      user: "director",
      psw: "root",
      //Los arrays es porque se le pueden agregar más validaciones segun las reglas del negocio
      userRules: [(v) => !!v || "Este campo es obligatorio"],
      pswRules: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    async login() {
      try {
        const result = await axios.post("/auth/login", {
          usuario: this.user,
          password: this.psw,
        });
        this.setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
