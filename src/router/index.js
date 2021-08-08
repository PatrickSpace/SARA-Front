import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Login from "@/views/auth/Login.vue";
import Home from "@/views/Home.vue";
import Userroutes from "@/router/users.routes.js";
import Proyectoroutes from "@/router/proyectos.routes.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { protegida: true },
    component: Home,
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
  Userroutes.detalle,
  Userroutes.profesores,
  Userroutes.coordinadores,
  Userroutes.directores,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("leerToken", to.name);
  const token = store.getters.getToken;
  const isprotegida = to.matched.some((ruta) => ruta.meta.protegida);
  if (isprotegida && token === null) {
    console.log("no tienes acceso");
    store.dispatch(
      "noti/agregarNotificacionErronea",
      "No tiene permisos para entrar a esta ruta"
    );
    next("/login");
  } else if (token && !isprotegida) {
    next();
  } else {
    next();
  }
});

export default router;
