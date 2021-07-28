import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Resumir from "@/views/Resumen.vue";
import Preguntas from "@/views/Preguntas.vue";
import Login from "@/views/auth/Login.vue";
import Profesorroutes from "@/router/profesor.routes.js";
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
  {
    path: "/p",
    component: Profesorroutes.home,
    children: [
      {
        path: "test",
        component: Profesorroutes.test,
      },
    ],
  },
  {
    path: "/d",
    name: "directorview",
  },
  {
    path: "/c",
    name: "coordinador",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.state.token;
  const isprotegida = to.matched.some((ruta) => ruta.meta.protegida);
  if (isprotegida && token === null) {
    next("/login");
    console.log("no tienes acceso");
  } else if (token && !isprotegida) {
    next("/");
  } else {
    next();
  }
});

export default router;
