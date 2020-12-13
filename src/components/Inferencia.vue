<template>
  <v-form class="container">
    <v-row>
      <v-col cols="12" md="12" lg="6" xl="6">
        <v-card elevation="8" class="container pa-8">
          <v-file-input
            v-model="pdfcontexto"
            v-if="pdf"
            counter
            truncate-length="1"
            label="Ingrese aqui el articulo cientifico"
            hint="Debe ingresar como maximo un archivo"
            prepend-icon="mdi-file-pdf"
            show-size
            :clearable="cl1"
            @change="changepdfinput"
          ></v-file-input>
          <v-textarea
            v-else
            v-model="contexto"
            auto-grow
            rows="15"
            outlined
            label="Contexto"
            counter
            hint="Ej: Yo soy Pedro y tengo 21 años"
            persistent-hint
          ></v-textarea>
          <p>{{ pdfcontexto.name }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="6" xl="6">
        <v-card elevation="8" class="container pa-8">
          <v-text-field
            v-model="pregunta"
            label="Pregunta"
            outlined
            hint="Ej: ¿Cuantos años tengo?"
            persistent-hint
          ></v-text-field>
          <v-btn
            v-if="rpta === ''"
            class="primary"
            block
            :loading="loading"
            @click="inferir()"
            >PREGUNTAR</v-btn
          >
          <v-btn
            v-else
            class="success"
            block
            :loading="loading"
            @click="reiniciar()"
            >REINICIAR</v-btn
          >
        </v-card>
        <v-scale-transition>
          <v-card v-if="rpta != ''" elevation="8" class="container mt-5">
            <v-card-title>Respuesta:</v-card-title>
            <v-card-text> Respuesta: {{ rpta.answer }}</v-card-text>
            <v-card-text>Puntaje: {{ rpta.score }}</v-card-text>
          </v-card>
        </v-scale-transition>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="contador"
      :timeout="-1"
      :value="true"
      fixed
      bottom
      color="teal darken-2"
      elevation="24"
    >
      Tiempo Transcurrido: {{ tiempo.min }} minutos {{ tiempo.s }}.{{
        tiempo.m
      }}
      segundos
    </v-snackbar>
  </v-form>
</template>
<script>
export default {
  name: "Inferencia",
  props: {
    pdf: Boolean,
  },
  data() {
    return {
      contexto: "",
      pdfcontexto: new File([""], "newfile.pdf"),
      pregunta: "",
      rpta: "",
      loading: false,
      datapdf: "inicio",
      cl1: false,
      b64: "",
      contador: false,
      tiempo: {
        s: 0,
        m: 0,
        min: 0,
      },
      // reader: new FileReader(),
    };
  },
  computed: {},
  methods: {
    contarsegundos() {
      if (this.tiempo.s >= 59) {
        this.tiempo.s = 0;
        this.tiempo.min += 1;
      } else if (this.tiempo.m >= 9) {
        this.tiempo.m = 0;
        this.tiempo.s += 1;
      } else this.tiempo.m += 1;
    },
    prueba() {
      console.log(this.b64);
    },
    async inferir() {
      try {
        if (this.contador === false) {
          this.contador = true;
        }
        var intervalo = window.setInterval(() => {
          this.contarsegundos();
        }, 100);
        this.loading = true;
        //this.contarsegundos();
        let respuesta = "";
        if (this.pdf === true) {
          //Si decide enviar un pdf
          respuesta = await axios.post(`http://127.0.0.1:5000/pdf`, {
            contexto: this.b64,
            pregunta: this.pregunta,
          });
        } else {
          // Si decide enviar texto
          respuesta = await axios.post(`http://127.0.0.1:5000/preguntar`, {
            contexto: this.contexto,
            pregunta: this.pregunta,
          });
        }
        this.rpta = await respuesta.data;
      } catch (error) {
        console.log(error);
        alert("Intentelo de nuevo");
      } finally {
        this.loading = false;
        clearInterval(intervalo);
      }
    },
    reiniciar() {
      this.rpta = "";
      this.pregunta = "";
      this.contador = false;
      this.tiempo.s = 0;
      this.tiempo.m = 0;
      //this.pdfcontexto = new File([""], "newfile.pdf");
    },
    changepdfinput() {
      const reader = new FileReader();
      reader.readAsDataURL(this.pdfcontexto);
      reader.onload = () => {
        this.b64 = reader.result;
      };
    },
  },
};
</script>