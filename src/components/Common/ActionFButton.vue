<template>
  <v-fab-transition>
    <v-speed-dial
      fixed
      v-model="actionbtn"
      bottom
      right
      direction="top"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="actionbtn" color="primary" dark fab>
          <v-icon v-if="actionbtn"> mdi-close </v-icon>
          <v-icon v-else> mdi-apps </v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click.stop="borrarelemento()"
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            color="red"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Eliminar</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click.stop="editarelemento()"
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            color="blue"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Editar</span>
      </v-tooltip>
    </v-speed-dial>
  </v-fab-transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ActionFButton",
  props: {
    id: String,
    tipo: String,
  },
  data() {
    return {
      actionbtn: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      borrarUsuario: "usuario/borrarUsuario",
      borrarProyecto: "proyecto/DeleteProject",
    }),
    borrarelemento() {
      try {
        this.loading = true;
        if (this.tipo === "user") {
          this.borrarUsuario(this.id);
          this.$router.go(-1);
        } else if (this.tipo === "project") {
          this.borrarProyecto(this.id);
          this.$router.push({ name: "Allproyectos" });
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    editarelemento() {
      console.log("Editando elemento" + this.id);
    },
  },
};
</script>

