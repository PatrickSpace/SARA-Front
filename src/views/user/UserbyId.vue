<template>
  <Defaultlayout v-bind:titulo="titulo">
    <section slot="contenido">
      <h1>usuario: {{ $route.params.id }}</h1>
    </section>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import { mapActions } from 'vuex';
export default {
  name: "UserbyId",
  components:{
      Defaultlayout
  },
  data() {
    return {
        titulo:"Detalle del usuario",
        proyecto:{
            nombre:"",
            codigo:"",
        }
    };
  },
  methods:{
      ...mapActions({getProyecto: "proyecto/getProyectobyId"}),
      actualizarproyecto(id){
          this.getProyecto(id);
      }
  },
  mounted(){
      this.actualizarproyecto(this.$route.params.id);
  }
};
</script>