<template>
  <v-list>
    <v-list-item to="/" link>
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group>
      <v-list-group :value="false" prepend-icon="mdi-account-group" no-action>
        <template v-slot:activator>
          <v-list-item-title>Usuarios</v-list-item-title>
        </template>
        <v-list-item
          dense
          :to="item.link"
          v-for="(item, i) in usuarios"
          :key="i"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
        {
          title: "Proyectos",
          icon: "mdi-file-document-multiple",
          link: "user/proyectos",
        },
      ],
      usuarios: [
        {
          title: "Profesores",
          icon: "mdi-view-dashboard",
          link: "/profesores",
        },
        {
          title: "Coordinadores",
          icon: "mdi-account-group",
          link: "/coordinadores",
        },
        {
          title: "Directores",
          icon: "mdi-file-document-multiple",
          link: "/directores",
        },
      ],
    };
  },
};
</script>

<style>
</style>