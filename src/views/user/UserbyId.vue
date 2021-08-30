<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <div v-if="loading">
        <v-row>
          <v-col xl="6" md="5" sm="12">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </v-col>
          <v-col xl="6" md="7" sm="12">
            <v-skeleton-loader
              type="article, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <v-fade-transition>
        <div v-if="!loading">
          <v-row>
            <v-col xl="6" md="5" sm="12">
              <h2 class="text--h2 font-weight-regular">Datos</h2>
              <v-divider class="mb-5"></v-divider>
              <p class="text--body1">
                <span class="font-weight-medium"> Nombre Completo: </span>
                {{ usuario.nombre }}
              </p>
              <p class="text--body1">
                <span class="font-weight-medium"> Usuario: </span>
                {{ usuario.username }}
              </p>
              <p class="text--body1">
                <span class="font-weight-medium"> Rol: </span>
                {{ usuario.rol }}
              </p>
            </v-col>
            <v-col v-if="usuario.rol === 'profesor'" xl="6" md="7" sm="12">
              <h2 class="text--h2 font-weight-regular">Proyectos asignados</h2>
              <v-divider class="mb-5"></v-divider>
              <v-card
                elevation="2"
                v-for="(p, i) in usuario.proyectos"
                :key="i"
              >
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title v-text="p.nombre"
                      >Single-line item</v-list-item-title
                    >
                    <v-list-item-subtitle
                      v-text="p.codigo"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="red lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <ActionFButton v-bind:id="id" tipo="user" />
        </div>
      </v-fade-transition>
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import ActionFButton from "@/components/Common/ActionFButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserbyId",
  components: {
    Defaultlayout,
    ActionFButton,
  },
  data() {
    return {
      titulo: "Detalle del usuario",
      loading: false,
      usuario: {
        nombre: "Julio Quispi",
        username: "user",
        rol: "profesor",
        proyectos: [{ nombre: "nombre 1", codigo: "codigo 1" }],
      },

      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({ getUsuariobyID: "usuario/getUserbyID" }),
    getUser(id) {
      try {
        this.loading = true;
        this.getUsuariobyID(id);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({ rol: "getCurrentUserRol" }),
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>