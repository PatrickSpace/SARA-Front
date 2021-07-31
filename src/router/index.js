import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Resumir from "@/views/Resumen.vue";
import Preguntas from "@/views/Preguntas.vue";
import Login from "@/views/auth/Login.vue";

import Userroutes from "@/router/users.routes.js";
import Proyectoroutes from "@/router/proyectos.routes.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "resumir",
    meta: { protegida: true },
    component: Resumir,
  },
  {
    path: "/preguntas",
    name: "preguntas",
    meta: { protegida: true },
    component: Preguntas,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  //******PROYECTOS************/
  Proyectoroutes.home,
  Proyectoroutes.proyectodetalle,

  //*******USUARIOS************/
  Userroutes.all,
  Userroutes.detalle

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("leerToken");
  const token = store.getters.getToken;
  const isprotegida = to.matched.some((ruta) => ruta.meta.protegida);
  if (isprotegida && token === null) {
    next("/login");
    console.log("no tienes acceso");
  } else if (token && !isprotegida) {
    next();
  } else {
    next();
  }
});

export default router;
