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
                {{ usuario.usuario }}
              </p>
              <p class="text--body1">
                <span class="font-weight-medium"> Rol: </span>
                {{ usuario.rol }}
              </p>
            </v-col>
            <v-col v-if="usuario.rol === 'Profesor'" xl="6" md="7" sm="12">
              <h2 class="text--h2 font-weight-regular">Proyectos asignados</h2>
              <v-divider class="mb-5"></v-divider>
              <v-container class="py-0" v-if="usuario.proyectos.length > 0">
                <v-card
                  elevation="2"
                  v-for="(p, i) in usuario.proyectos"
                  :key="i"
                  class="mb-3"
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
                  </v-list-item>
                </v-card>
              </v-container>
              <v-alert
                class="mt-5"
                v-else
                colored-border
                type="warning"
                border="left"
                elevation="2"
              >
                <span class="text--caption">No se han asignados proyectos</span>
              </v-alert>
            </v-col>
          </v-row>

          <ActionbuttonUser
            v-bind:id="id"
            v-bind:usuariofromcomponent="usuario"
          />
        </div>
      </v-fade-transition>
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import ActionFButton from "@/components/Common/ActionFButton.vue";
import ActionbuttonUser from "@/components/Modulos/User/ActionbuttonUser";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserbyId",
  components: {
    Defaultlayout,
    ActionFButton,
    ActionbuttonUser,
  },
  data() {
    return {
      titulo: "Detalle del usuario",
      loading: false,
      usuario: {
        nombre: "Julio Quispi",
        usuario: "user",
        rol: "Profesor",
        proyectos: [],
      },
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({ getUsuariobyID: "usuario/getUserbyID" }),
    async getUser(id) {
      try {
        this.loading = true;
        const userfound = await this.getUsuariobyID(id);
        this.usuario = userfound;
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