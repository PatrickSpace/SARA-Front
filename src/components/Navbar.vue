<template>
  <v-app-bar app absolute dark>
    <v-toolbar-title>S.A.R.A.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-tabs centered grow>
        <v-tab to="/">Resumen</v-tab>
        <v-tab to="/preguntas">Preguntas</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script>
export default {
  name: "Navbar",
};
</script>