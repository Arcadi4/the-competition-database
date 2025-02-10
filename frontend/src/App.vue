<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <n-layout has-sider position="absolute" style="max-height: 100%">
                <n-layout-sider
                    :collapsed="sideBarCollapsed"
                    :collapsed-width="64"
                    :width="256"
                    bordered
                    collapse-mode="width"
                    @collapse="sideBarCollapsed = true"
                    @expand="sideBarCollapsed = false"
                >
                    <n-menu
                        :collapsed="sideBarCollapsed"
                        :collapsed-icon-size="24"
                        :collapsed-width="64"
                        :icon-size="20"
                        :options="menuOptions"
                        :value="activeKey"
                    />
                    <n-button
                        circle
                        style="
                            position: fixed;
                            bottom: 70px;
                            left: 32px;
                            transform: translateX(-50%);
                        "
                    >
                        <dark-mode />
                    </n-button>
                    <n-button
                        circle
                        style="
                            position: fixed;
                            bottom: 20px;
                            left: 32px;
                            transform: translateX(-50%);
                        "
                        @click="collapseSideBar"
                    >
                        <left v-if="!sideBarCollapsed" />
                        <right v-if="sideBarCollapsed" />
                    </n-button>
                </n-layout-sider>
                <n-layout
                    ref="headerLayoutRef"
                    :native-scrollbar="false"
                    content-class="router-view"
                >
                    <n-layout-content
                        :native-scrollbar="false"
                        bordered
                        content-style="overflow-y: auto"
                        embedded
                        position="absolute"
                    >
                        <router-view />
                    </n-layout-content>
                </n-layout>
            </n-layout>
        </n-message-provider>
    </n-config-provider>
</template>

<script lang="ts" setup>
import { DarkMode, Left, Right } from "@icon-park/vue-next";
import { onMounted, onUnmounted, ref, watch } from "vue";
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

const date = ref(new Date().toLocaleString().split(" ")[0]);
const time = ref(new Date().toLocaleString().split(" ")[1]);

const updateTime = () => {
    date.value = new Date().toLocaleString().split(" ")[0];
    time.value = new Date().toLocaleString().split(" ")[1];
};

let intervalId: number;

onMounted(() => {
    intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
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
