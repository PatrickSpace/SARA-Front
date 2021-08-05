<template>
  <div class="notificationlist">
    <Notification
      v-for="(noti, i) in notificaciones"
      :key="i"
      v-bind:tipo="noti.tipo"
      v-bind:color="noti.color"
      v-bind:msg="noti.msg"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Notification from "@/components/Common/Notification.vue";
export default {
  name: "NotificationList",
  components: {
    Notification,
  },
  data: () => ({
    msg: "Hola",
    activo: true,
  }),
  computed: {
    ...mapGetters({ notificaciones: "noti/getNotifications" }),
  },
};
</script>

<style>
.notificationlist {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: 15px;
  padding-bottom: 5px;
  min-width: 30%;
  display: block;
  transition: 1s;
}
</style>