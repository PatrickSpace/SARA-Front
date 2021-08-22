<template>
  <v-list>
    <v-list-item-group color="white">
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
</template>

<script>
export default {
  name: "DirectorNav",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        {
          title: "Mis Proyectos",
          icon: "mdi-file-document-multiple",
          link: "/misproyectos",
        },
      ],
    };
  },
};
</script>

<style>
</style>