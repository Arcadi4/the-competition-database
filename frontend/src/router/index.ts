import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import TimelineView from "@/views/TimelineView.vue";
import SearchView from "@/views/SearchView.vue";
import ContributeView from "@/views/ContributeView.vue";
import LoginView from "@/views/LoginView.vue";
import ReviewView from "@/views/ReviewView.vue";
import RejectedEventsView from "@/views/RejectedEventsView.vue";

const routes: Array<RouteRecordRaw> = [
    routeRecordRaw("timeline", TimelineView),
    routeRecordRaw("about", AboutView),
    routeRecordRaw("search", SearchView),
    routeRecordRaw("contribute", ContributeView),
    routeRecordRaw("login", LoginView),
    routeRecordRaw("review", ReviewView),
    routeRecordRaw("rejected", RejectedEventsView),
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

function routeRecordRaw(name: string, component: any): RouteRecordRaw {
    return {
        path: `/${name}`,
        name: name,
        component: component,
    };
}

export default router;
