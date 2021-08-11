<template>
  <v-app app>
    <transition name="slide" mode="in-out" appear>
      <Navdrawer />
    </transition>
    <transition name="fade" mode="out-in">
      <v-main class="main">
        <v-container class="pt-10">
          <h4 class="text-h4">{{ titulo }}</h4>
          <v-divider class="mb-10"></v-divider>
          <slot name="contenido"></slot>
        </v-container>
      </v-main>
    </transition>
    <NotificationList />
  </v-app>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.main {
  background-color: rgb(253, 253, 253);
}
</style>
<script>
import Navdrawer from "@/components/Nav/Navdrawer.vue";
import NotificationList from "@/components/Common/NotificationList.vue";
export default {
  name: "ProfesorLayout",
  components: {
    Navdrawer,
    NotificationList,
  },
  props: {
    titulo: String,
  },
  data() {
    return {
      title: "Sistema para la Automatización de Revisión y Analisis de tesis",
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>