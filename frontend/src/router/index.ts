import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import TimelineView from "@/views/TimelineView.vue";
import SearchView from "@/views/SearchView.vue";
import ContributeView from "@/views/ContributeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "timeline",
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
    {
        path: "/contribute",
        name: "contribute",
        component: ContributeView,
    },
    {
        path: "/login",
        name: "login",
        component: ContributeView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
