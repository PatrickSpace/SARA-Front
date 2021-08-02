<template>
  <v-app-bar height="72" flat app absolute dark color="primary">
    <v-toolbar-title>S.A.R.A. - {{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import Navdrawer from "@/components/Nav/Navdrawer";
export default {
  name: "Navbar",
  props: {
    title: String,
  },
  components: {
    Navdrawer,
  },
  data() {
    return {};
  },
};
</script>