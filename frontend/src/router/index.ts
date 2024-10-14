import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import TimelineView from "@/views/TimelineView.vue";
import SearchView from "@/views/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "app",
        component: TimelineView,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },
    {
        path: "/search",
        name: "search",
        component: SearchView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
