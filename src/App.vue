<template>
  <transition name="fade" mode="in-out" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "App",
};
</script>


