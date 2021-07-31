import Allusers from "@/views/user/Allusers.vue";
import userDetail from "@/views/user/UserbyId.vue";

export default {
    all: {
        name: "Allusers",
        path: "/usuarios",
        component: Allusers,
        meta: { protegida: true }
    },
    detalle: {
        name: "UserDetail",
        path: "/usuarios/:id",
        component: userDetail,
        meta: { protegida: true }
    },
}