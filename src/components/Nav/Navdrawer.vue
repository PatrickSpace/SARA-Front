<template>
  <v-navigation-drawer
    color="primary"
    disable-route-watcher
    dark
    app
    permanent
    expand-on-hover
  >
    <template v-slot:prepend>
      <v-list-item-group>
        <v-list-item color="white" two-line>
          <v-list-item-icon>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ getUser.nombre }}</v-list-item-title>
            <v-list-item-subtitle>{{ getUser.rol }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
    </template>

    <DirectorNav v-if="getUser.rol == 'Director'" />
    <CoordinadorNav v-if="getUser.rol == 'Coordinador'" />
    <ProfesorNav v-if="getUser.rol == 'Profesor'" />

    <template v-slot:append>
      <v-list-item-group>
        <v-list-item link @click.stop="cerrarSesion()">
          <v-list-item-icon>
            <v-icon color="red lighten-2">mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProfesorNav from "@/components/Nav/NavItems/ProfesorNav.vue";
import DirectorNav from "@/components/Nav/NavItems/DirectorNav.vue";
import CoordinadorNav from "@/components/Nav/NavItems/CoordinadorNav.vue";
export default {
  name: "Navdrawer",
  components: {
    ProfesorNav,
    DirectorNav,
    CoordinadorNav,
  },
  data() {
    return {
      rol: "director",
    };
  },
  methods: {
    ...mapActions(["logout"]),
    cerrarSesion() {
      this.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({ getUser: "getCurrentUser" }),
  },
};
</script>
