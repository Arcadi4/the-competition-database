<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <n-layout
                :native-scrollbar="false"
                has-sider
                position="absolute"
                style="max-height: 100%"
            >
                <n-layout>
                    <global-sidebar />
                    <n-layout-content bordered embedded position="absolute">
                        <router-view />
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </n-message-provider>
    </n-config-provider>
</template>

<script lang="ts" setup>
import { DarkMode, Left, Right } from "@icon-park/vue-next";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { menuOptions } from "./views/menuOptions";
import themeOverrides from "@/theme/override.json";

const route = useRoute();
const activeKey = ref("");

watch(
    route,
    (newRoute) => {
        activeKey.value = newRoute.name as string;
    },
    { immediate: true }
);

const sideBarCollapsed = ref(true);

const collapseSideBar = () => {
    sideBarCollapsed.value = !sideBarCollapsed.value;
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

#app {
    font-family: "Space Grotesk", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.hidden {
    display: none;
}
</style>
