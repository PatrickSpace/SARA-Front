<template>
  <v-navigation-drawer disable-route-watcher light app permanent expand-on-hover>
    <template v-slot:prepend>
      <v-list-item-group color="primary">
        <v-list-item two-line link>
          <v-list-item-icon>
            <v-icon > mdi-account-circle </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-subtitle>Rol</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
    </template>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item :to="item.link" v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-list-item-group>
        <v-list-item link @click.stop="logout()">
          <v-list-item-icon>
            <v-icon color="red">mdi-power</v-icon>
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
import { mapActions } from "vuex";
export default {
  name: "Navdrawer",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Usuarios", icon: "mdi-account-group", link: "/usuarios" },
        {
          title: "Proyectos",
          icon: "mdi-file-document-multiple",
          link: "/proyectos",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
