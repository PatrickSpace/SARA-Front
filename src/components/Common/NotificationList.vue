<template>
  <div class="notificationlist">
    <h2>{{notificaciones.length }}</h2>
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
import Notification from "@/components/Common/Notification.vue";
export default {
  name: "NotificationList",
  components: {
    Notification,
  },
  data: () => ({
    msg: "Hola",
    activo: true,
    noti: {
      tipo: "success",
      color: "green",
      msg: "Alerta",
    },
    notificaciones: [
      {
        tipo: "success",
        color: "green",
        msg: "Alerta",
      },
      {
        tipo: "warning",
        color: "red",
        msg: "Alerta",
      },
    ],
  }),
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
  transition:1s;
}
</style>