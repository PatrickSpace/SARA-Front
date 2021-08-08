<template>
  <v-alert
    style="transition: 1s"
    transition="slide-x-reverse-transition"
    :type="tipo"
    :color="color"
    :value="visible"
    tag="div"
    elevation="6"
  >
    {{ msg }}
    <template v-slot:close>
      <v-btn @click.stop="quitar(index)" class="ml-5" small icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Notification",
  data() {
    return {};
  },
  props: {
    tipo: String,
    color: String,
    msg: String,
    visible: Boolean,
    index: Number,
  },
  methods: {
    ...mapActions({
      quitar: "noti/ocultarNotificacion",
    }),
  },
};
</script>
