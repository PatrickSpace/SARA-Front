<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <div class="skeleton" v-if="loading">
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
                <span class="font-weight-medium"> Codigo: </span>
                {{ proyecto.codigo }}
              </p>
              <p class="text--body1">
                <span class="font-weight-medium"> Nombre: </span>
                {{ proyecto.nombre }}
              </p>
            </v-col>
            <v-col xl="6" md="7" sm="12">
              <h2 class="text--h2 font-weight-regular">Documentos</h2>
              <v-divider class="mb-5"></v-divider>
              <v-alert
                class="mt-5"
                v-if="proyecto.documentos.length === 0"
                colored-border
                type="warning"
                border="left"
                elevation="2"
              >
                <span class="text--caption">No existen documentos</span>
              </v-alert>
              <v-list v-else>
                <v-list-item-group>
                  <v-list-item
                    v-for="(d, index) in proyecto.documentos"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="d.nombre">{{
                        d.nombre
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>hola</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-scroll-x-transition v-if="agregar">
                <v-form
                  ref="docform"
                  v-model="docformvalidation"
                  lazy-validation
                  @submit.prevent="agregardoc()"
                >
                  <v-file-input
                    accept=".pdf"
                    required
                    :rules="docrules"
                    v-model="doc"
                    show-size
                    label="Documento de tesis"
                    clearable
                    persistent-hint
                    hint="Solo archivos pdf"
                    class="mb-5"
                  ></v-file-input>
                  <v-btn
                    text
                    color="primary"
                    type="submit"
                    :loading="docloading"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    <v-spacer></v-spacer>
                    Agregar</v-btn
                  >
                  <v-btn text color="error" @click.stop="reiniciardocform()">
                    <v-icon left>mdi-cancel </v-icon>
                    <v-spacer></v-spacer>
                    cancelar</v-btn
                  >
                </v-form>
              </v-scroll-x-transition>
              <v-scroll-x-transition v-else>
                <v-btn
                  large
                  text
                  class="mb-2"
                  color="primary"
                  @click.stop="agregar = true"
                >
                  <v-icon left>mdi-plus </v-icon>
                  <v-spacer></v-spacer>
                  Agregar documentos</v-btn
                >
              </v-scroll-x-transition>
            </v-col>
          </v-row>

          <ActionFButton v-if="isDirector" v-bind:id="id" tipo="project" />
        </div>
      </v-fade-transition>
    </section>
  </Defaultlayout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import ActionFButton from "@/components/Common/ActionFButton.vue";
export default {
  name: "ProyectobyId",
  components: {
    Defaultlayout,
    ActionFButton,
  },
  data() {
    return {
      titulo: "Detalle del proyecto",
      id: this.$route.params.id,
      isDirector: false,
      loading: false,
      docloading: false,
      agregar: false,
      doc: null,
      docrules: [(v) => !!v || "File is required"],
      docformvalidation: true,
      proyecto: {
        codigo: "cod",
        nombre: "name",
        documentos: [{ id: 1, nombre: "hola" }],
      },
    };
  },
  methods: {
    ...mapActions({
      getProyectobyId: "proyecto/getProyectobyId",
    }),
    agregardoc() {
      if (this.$refs.docform.validate()) {
        const docu = {
          id: 1,
          nombre: this.doc.nombre,
        };
        this.proyecto.documentos.push(docu);
        console.log(this.proyecto.documentos);
        this.reiniciardocform();
      }
    },
    reiniciardocform() {
      this.agregar = false;
      this.$refs.docform.reset();
    },
    getproyectofromAPI: async function () {
      try {
        this.loading = true;
        this.proyecto = await this.getProyectobyId(this.id);
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
    this.getproyectofromAPI();
    if (this.rol === "Director") this.isDirector = true;
  },
};
</script>