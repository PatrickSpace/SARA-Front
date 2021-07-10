import Vue from "vue";
import VueRouter from "vue-router";
import Resumir from "@/views/Resumen.vue";
import Preguntas from "@/views/Preguntas.vue";
import Login from "@/views/auth/Login.vue";
import Profesorroutes from "@/router/profesor.routes.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "resumir",
    component: Resumir,
  },
  {
    path: "/preguntas",
    name: "preguntas",
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

export default router;
