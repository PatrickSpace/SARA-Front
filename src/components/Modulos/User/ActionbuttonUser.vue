<template>
  <div>
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
            @click.stop="deldialog = true"
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
            @click.stop="editdialog = true"
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

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click.stop="addprojectdialog = true"
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            color="indigo"
          >
            <v-icon>mdi-playlist-plus</v-icon>
          </v-btn>
        </template>
        <span>Asignar proyecto</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="deldialog" max-width="490" persistent>
      <v-card :loading="delloading" :disabled="delloading">
        <v-card-title>
          ¿Estas seguro que desea eliminar el usuario?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="deldialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click.stop="borrarusuario()">
            Borrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editdialog" max-width="450" persistent>
      <v-card class="pa-3">
        <v-card-title> Editar usuario </v-card-title>
        <v-form
          ref="form"
          v-model="validedit"
          @submit.prevent="edituser()"
          class="px-3"
        >
          <v-card-text class="pt-2">
            <v-text-field
              :loading="editloading"
              prepend-inner-icon="mdi-card-account-details"
              v-model="usuario.nombre"
              counter="50"
              clearable
              :rules="rules.nombreRules"
              label="Nombre completo"
              required
            ></v-text-field>
            <v-text-field
              :loading="editloading"
              prepend-inner-icon="mdi-account"
              v-model="usuario.usuario"
              counter="30"
              clearable
              :rules="rules.userRules"
              label="Nombre de usuario"
              required
            ></v-text-field>
            <v-text-field
              :loading="editloading"
              prepend-inner-icon="mdi-lock"
              v-model="psw"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="pswRules"
              label="Contraseña"
              clearable
              required
              @click:append="show = !show"
            ></v-text-field>
            <v-select
              :loading="editloading"
              prepend-inner-icon="mdi-account-box-multiple"
              v-model="select"
              :items="roles"
              item-text="texto"
              item-value="valor"
              label="Rol"
              return-object
              single-line
              required
              :rules="rules.rolRules"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              :disabled="editloading"
              text
              dark
              @click="cancelar()"
            >
              Cancelar
            </v-btn>
            <v-btn color="primary" text :loading="editloading" type="submit">
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addprojectdialog" max-width="600" persistent>
      <v-card class="pa-3" :loading="asignloading">
        <v-card-title> Asignar un proyecto </v-card-title>
        <v-data-table
          v-model="proyectos"
          loading-text="Cargando, por favor espere"
          no-data-text="No existen proyectos para asignar"
          no-results-text="No hay coincidencias"
          :headers="headers"
          :items="getProyectos"
          item-key="codigo"
          show-select
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="labelbusqueda"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            :disabled="asignloading"
            text
            @click="addprojectdialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            :loading="asignloading"
            text
            @click.stop="asignar()"
          >
            Asignar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ActionbuttonUser",
  props: {
    id: String,
    usuariofromcomponent: Object,
  },
  data() {
    return {
      actionbtn: false,
      //delete
      deldialog: false,
      delloading: false,

      //update
      editdialog: false,
      editloading: false,
      validedit: true,
      select: null,
      roles: [
        { texto: "Profesor", valor: ["profesor"] },
        { texto: "Coordinador", valor: ["profesor", "coordinador"] },
        { texto: "Director", valor: ["profesor", "coordinador", "director"] },
      ],
      usuario: {
        nombre: "",
        usuario: "",
        roles: [],
      },
      psw: "",
      show: false,
      pswRules: [(v) => !!v || "Este campo es obligatorio"],
      rules: {
        nombreRules: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length <= 50) ||
            "Este campo debe contener como máximo 50 caracteres",
          (v) =>
            !/[^a-zA-Z ]+/.test(v) || "Este campo solo debe contener letras",
        ],
        userRules: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length <= 30) ||
            "Este campo debe contener como máximo 30 caracteres",
        ],
        rolRules: [(v) => !!v || "Este campo es obligatorio"],
      },

      //Asignar
      addprojectdialog: false,
      titulo: "Proyectos",
      tableTitulo: "Todos los proyectos",
      labelbusqueda: "Buscar por nombre o codigo",
      search: "",
      asignloading: false,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Codigo", value: "codigo" },
      ],
      proyectos: [],
    };
  },
  methods: {
    ...mapActions({
      borrarUsuario: "usuario/borrarUsuario",
      updateuser: "usuario/updateUsuario",
      obtenerproyectosfromAPI: "proyecto/getProyectos",
      asignarproyectos: "usuario/asignProyecttouser",
    }),
    async borrarusuario() {
      try {
        this.delloading = true;
        await this.borrarUsuario(this.id);
        this.$router.go(-1);
      } catch (err) {
        console.log(err);
      } finally {
        this.delloading = false;
      }
    },
    cancelar() {
      this.editdialog = false;
      this.$refs.form.reset();
    },
    async edituser() {
      if (this.$refs.form.validate()) {
        try {
          this.editloading = true;
          if (this.select != null) this.usuario.roles = this.select.valor;
          const payload = {
            usuario: this.usuario,
            id: this.id,
          };
          await this.updateuser(payload);
          this.cancelar();
          setTimeout(() => {
            this.$router.go();
          }, 3000);
        } catch (e) {
          console.log(e);
        } finally {
          this.editloading = false;
        }
      }
    },
    obtenerproyectos: function () {
      try {
        this.loading = true;
        this.obtenerproyectosfromAPI();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async asignar() {
      try {
        this.asignloading = true;
        let proyectsids = [];
        if (this.proyectos.length > 0)
          proyectsids = this.proyectos.map((p) => p._id);
        const payload = {
          id: this.id,
          projids: proyectsids,
        };
        await this.asignarproyectos(payload);
        this.addprojectdialog = false;
        setTimeout(() => {
          this.$router.go();
        }, 3000);
      } catch (error) {
        console.log(error);
      } finally {
        this.asignloading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getProyectos: "proyecto/getAllProyectos",
    }),
  },
  mounted() {
    const { nombre, rol, usuario } = this.usuariofromcomponent;
    this.usuario.nombre = nombre;
    this.usuario.usuario = usuario;
    switch (rol) {
      case "Profesor":
        this.select = { texto: "Profesor", valor: ["profesor"] };
        break;
      case "Coordinador":
        this.select = {
          texto: "Coordinador",
          valor: ["profesor", "coordinador"],
        };
      case "Director":
        this.select = {
          texto: "Director",
          valor: ["profesor", "coordinador", "director"],
        };
      default:
        this.select = { texto: "Profesor", valor: ["profesor"] };
        break;
    }
  },
  created() {
    this.obtenerproyectos();
  },
};
</script>

<style>
</style>