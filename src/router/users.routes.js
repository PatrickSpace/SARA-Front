import Allusers from "@/views/user/Allusers.vue";
import Allprofesores from "@/views/user/Allprofesores.vue";
import AllDirectores from "@/views/user/Alldirectores.vue";
import Allcoordinadores from "@/views/user/Allcoordinadores.vue";
import userDetail from "@/views/user/UserbyId.vue";

export default {
  all: {
    name: "Allusers",
    path: "/usuarios",
    component: Allusers,
    meta: { protegida: true },
  },
  detalle: {
    name: "UserDetail",
    path: "/usuarios/:id",
    component: userDetail,
    meta: { protegida: true },
  },
  profesores: {
    name: "Profesores",
    path: "/profesores",
    component: Allprofesores,
    meta: { protegida: true },
  },
  coordinadores: {
    name: "Coordinadores",
    path: "/coordinadores",
    component: Allcoordinadores,
    meta: { protegida: true },
  },
  directores: {
    name: "Directores",
    path: "/directores",
    component: AllDirectores,
    meta: { protegida: true },
  },
};
