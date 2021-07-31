<template>
  <transition>
    <router-view></router-view>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
};
</script>
