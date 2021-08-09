<template>
  <v-app app>
    <v-main class="d-flex align-center" tag="div" app>
      <v-card
        class="mx-auto my-auto px-5 pb-10"
        max-width="400"
        :loading="loading"
      >
        <v-card-title class="pt-10">Iniciar sesión</v-card-title>
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
            <v-btn
              :loading="loading"
              class="primary"
              type="submit"
              block
              v-on:keyup.enter="submit"
              >Ingresar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-main>
    <NotificationList />
  </v-app>
</template>
<script>
import NotificationList from "@/components/Common/NotificationList.vue";
import { mapActions } from "vuex";
export default {
  name: "Loginview",
  components: {
    NotificationList,
  },
  data: () => {
    return {
      loading: false,
      validlogin: true,
      show: false,

      msg: "",
      user: "director",
      psw: "root",
      //Los arrays es porque se le pueden agregar más validaciones segun las reglas del negocio
      userRules: [(v) => !!v || "Este campo es obligatorio"],
      pswRules: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    ...mapActions({
      addsuccessnoti: "noti/agregarNotificacionExitosa",
      adderrornoti: "noti/agregarNotificacionErronea",
      setLocalToken: "setLocalToken",
    }),
    async login() {
      try {
        this.loading = true;
        const result = await axios.post("/auth/login", {
          usuario: this.user,
          password: this.psw,
        });
        const token = result.data.token;
        this.setLocalToken(token);
        const now = new Date();
        const expira = now.getTime() + 86400000; //24h
        localStorage.setItem("expira", expira);
        this.addsuccessnoti("Inicio de sesión correcto");
        this.$router.push("/");
      } catch (error) {
        let msg = null;
        if (error.response.data.msg) {
          msg = error.response.data.msg;
        }
        this.adderrornoti(msg);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
