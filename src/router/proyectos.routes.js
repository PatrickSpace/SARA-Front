import Home from "@/views/proyecto/Allproyectos.vue";
import Detail from "@/views/proyecto/ProyectobyId.vue";

export default {
  home: {
    name: "Allproyectos",
    path: "/proyectos",
    component: Home,
    meta: { protegida: true },
  },
  proyectodetalle: {
    name: "ProyectDetalle",
    path: "/proyectos/:id",
    component: Detail,
    meta: { protegida: true },
  },
};
