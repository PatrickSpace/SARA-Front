<template>
  <v-navigation-drawer app permanent expand-on-hover>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list-item link @click.stop="logout()">
        <v-list-item-icon>
          <v-icon>mdi-power</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Navdrawer",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>
