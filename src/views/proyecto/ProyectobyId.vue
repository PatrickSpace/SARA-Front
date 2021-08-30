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
              <span class="font-weight-medium"> Documento: </span>
              <v-alert
                class="mt-5"
                v-if="documento.nombre === ''"
                colored-border
                type="info"
                border="left"
                elevation="2"
              >
                <span class="text--caption">No existe un documento</span>
              </v-alert>
              <v-list v-else>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ documento.nombre }} , {{ documento.texto }}
                      </v-list-item-title>
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
                  {{ textodocadd }}</v-btn
                >
              </v-scroll-x-transition>
            </v-col>

            <v-col xl="6" md="7" sm="12">
              <h2 class="text--h2 font-weight-regular">Preguntas</h2>
              <v-divider class="mb-5"></v-divider>
              <v-alert
                class="mt-5"
                v-if="documento.nombre === ''"
                colored-border
                type="warning"
                border="left"
                elevation="2"
              >
                <span class="text--caption"
                  >No se pueden realizar preguntas hasta que agregue un
                  documento</span
                >
              </v-alert>
              <v-form
                ref="qaform"
                v-else
                v-model="validqa"
                @submit.prevent="preguntar()"
              >
                <v-container class="px-5">
                  <v-textarea
                    required
                    clearable
                    label="Pregunta"
                    outlined
                    auto-grow
                    v-model="pregunta"
                    :loading="qaloading"
                    :rules="qarules"
                  ></v-textarea>
                  <v-btn
                    v-if="rpta === ''"
                    color="primary"
                    block
                    :loading="qaloading"
                    type="submit"
                    large
                  >
                    Preguntar
                    <v-icon right dark> mdi-file-question-outline </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    color="primary"
                    block
                    :loading="qaloading"
                    @click.stop="resetqa()"
                  >
                    Reiniciar
                    <v-icon small right dark> mdi-reload </v-icon>
                  </v-btn>
                </v-container>
                <v-fade-transition v-if="rpta != ''">
                  <v-container class="px-5">
                    <h4 class="text--h4 font-weight-bold">Respuesta:</h4>
                    <p class="text--body1">{{ rpta }}</p>
                    <p class="text--body1">
                      <span class="font-weight-bold"> Presición: </span>
                      {{ presicion }}
                    </p>
                  </v-container>
                </v-fade-transition>
              </v-form>
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
      textodocadd: "",
      agregar: false,
      docrules: [(v) => !!v || "Este campo es obligatorio"],
      docformvalidation: true,
      proyecto: {
        codigo: "cod",
        nombre: "name",
      },
      documento: { nombre: "j", texto: "textp" },
      doc: null,
      //preguntas
      pregunta: "Pregunta random",
      validqa: false,
      qaloading: false,
      qarules: [(v) => !!v || "Este campo es obligatorio"],
      rpta: "",
      presicion: "2%",
    };
  },
  methods: {
    ...mapActions({
      getProyectobyId: "proyecto/getProyectobyId",
    }),
    agregardoc() {
      if (this.$refs.docform.validate() && this.doc) {
        const docu = {
          nombre: this.doc.name,
          texto: "cualquier texto",
        };
        this.documento = docu;
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
    changetextofbuttonadddoc() {
      if (this.documento.nombre === "") {
        this.textodocadd = "Agregar un documento";
      } else {
        this.textodocadd = "Actualizar documento";
      }
    },
    preguntar() {
      if (this.$refs.qaform.validate()) {
        try {
          this.qaloading = true;
          this.rpta = "respuesta random";
        } catch (e) {
          console.log(e);
        } finally {
          this.qaloading = false;
        }
      }
    },
    resetqa() {
      this.$refs.qaform.reset();
      this.rpta = "";
    },
  },
  computed: {
    ...mapGetters({ rol: "getCurrentUserRol" }),
  },
  updated() {
    this.changetextofbuttonadddoc();
  },
  mounted() {
    this.getproyectofromAPI();
    if (this.rol === "Director") this.isDirector = true;
    this.changetextofbuttonadddoc();
  },
};
</script>