<template>
  <v-alert
    style="transition: 1s"
    dismissible
    transition="slide-x-reverse-transition"
    :type="tipo"
    :color="color"
    >{{ msg }}</v-alert
  >
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {};
  },
  props: {
    tipo: String,
    color: String,
    msg: String,
  },
};
</script>

<style>
</style>