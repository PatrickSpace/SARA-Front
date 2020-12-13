<template>
  <v-row>
    <v-col cols="12" md="12" lg="6" xl="6">
      <v-card class="container pa-10" elevation="8">
        <v-form>
          <v-textarea
            v-model="text"
            auto-grow
            rows="10"
            outlined
            label="Documento"
            hint="Ingrese el texto que desee resumir"
          ></v-textarea>
          <v-btn
            v-if="!resultado"
            class="primary"
            block
            :loading="resumiendo"
            @click="resumir()"
          >RESUMIR</v-btn>
          <v-btn v-else class="success" block :loading="resumiendo" @click="reiniciar()">REINICIAR</v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="12" lg="6" xl="6">
      <v-scale-transition>
        <v-card v-if="resultado" elevation="8" class="container pa-10">
          <v-textarea
            v-model="texto_resumido"
            id="resumido"
            auto-grow
            readonly
            outlined
            ref="textToCopy"
          ></v-textarea>
          <v-btn @click="copiar()" id="btncopiar" small absolute fab right bottom color="primary">
            <v-icon small>mdi-clipboard-multiple</v-icon>
          </v-btn>
        </v-card>
      </v-scale-transition>
    </v-col>

    <v-snackbar v-model="snackbar" timeout="2000" absolute bottom elevation="24" color="success">
      <div class="mx-auto">Copiado</div>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Summary",
  data() {
    return {
      text: "",
      snackbar: "",
      resultado: false,
      texto_resumido: "",
      resumiendo: false,
    };
  },
  methods: {
    copiar() {
      let textToCopy = document.getElementById("resumido");
      textToCopy.select();
      document.execCommand("copy");
      this.snackbar = true;
    },
    async resumir() {
      try {
        this.resumiendo = true;
        //let datos = await axios.get(`http://127.0.0.1:5000/`);
        let resumen = await axios.post(
          `https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-summarize-news`,
          {model_id: this.text},
        );
        this.texto_resumido = await resumen.data;
        this.resultado = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.resumiendo = false;
      }
    },
    reiniciar() {
      this.resultado = false;
    },
  },
  computed: {},
};
</script>
