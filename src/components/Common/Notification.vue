<template>
  <v-alert dismissible transition="slide-x-reverse-transition" :type="tipo"  :color="color" >{{msg}}</v-alert>
</template>

<script>
export default {
  name: "Notification",
  props: {
    tipo: String,
    color: String,
    msg:String
  },
};
</script>

<style>
</style>