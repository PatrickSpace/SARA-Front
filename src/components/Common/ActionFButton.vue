<template>
  <v-fade-transition>
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
            @click.stop="dialog = true"
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

      <EditUser v-bind:usuariofromcomponent="usuario" />
      <v-dialog v-model="deldialog" max-width="290">
        <v-card>
          <v-card-title> ¿Estas seguro que desea eliminar? </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>
            <v-btn color="green darken-1" text @click.stop="borrarelemento()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-speed-dial>
  </v-fade-transition>
</template>

<script>
import EditUser from "@/components/Modulos/User/EditUser.vue";
import { mapActions } from "vuex";
export default {
  name: "ActionFButton",
  components: {
    EditUser,
  },
  props: {
    id: String,
    tipo: String,
    usuario: Object,
  },
  data() {
    return {
      actionbtn: false,
      loading: false,
      deldialog: false,
      editdialog: false,
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

