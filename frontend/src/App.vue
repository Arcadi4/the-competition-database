<template>
    <n-config-provider>
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
                    :icon-size="16"
                    :options="menuOptions"
                    :value="activeKey"
                />
                <n-button
                    circle
                    class="collapse-button"
                    @click="collapseSideBar"
                >
                    <left v-if="!sideBarCollapsed" />
                    <right v-if="sideBarCollapsed" />
                </n-button>
            </n-layout-sider>
            <n-layout
                ref="headerLayoutRef"
                :native-scrollbar="false"
                :on-scroll="headerScrollHandler"
                content-class="router-view"
            >
                <n-layout-header
                    ref="headerRef"
                    :position="headerPosition"
                    bordered
                    style="z-index: 10"
                >
                    <div style="padding: 20px">
                        <h2 style="line-height: 0">{{ date }}</h2>
                        {{ time }}
                    </div>
                </n-layout-header>
                <n-layout-content
                    bordered
                    content-class="router-view"
                    content-style="display: flex; justify-content: center; padding: 20px 0px"
                >
                    <router-view class="router-view" />
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-config-provider>
</template>

<script lang="ts" setup>
import { Left, Right } from "@icon-park/vue-next";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { menuOptions } from "./views/menuOptions";

// TODO: THIS FILE IS A MESS

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

const headerLayoutRef = ref<HTMLElement | null>(null);
const headerPosition = ref<"absolute" | "static">("static");
const headerRef = ref<HTMLElement | null>(null);

const headerScrollHandler = () => {
    console.log(headerLayoutRef.value.scrollbarInstRef.containerScrollTop);
    console.log(headerRef.value);
    if (
        headerLayoutRef.value?.scrollbarInstRef.containerScrollTop &&
        headerLayoutRef.value.scrollbarInstRef.containerScrollTop > 50
    ) {
        headerPosition.value = "absolute";
    } else {
        headerPosition.value = "static";
    }
};
</script>

<style lang="scss">
// Font Space Grotesk
// This seems to be working in Mainland China
// Maybe consider adding a fallback url if needed
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

#app {
    font-family: "Space Grotesk", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1f1f1f;
}

.collapse-button {
    position: fixed;
    bottom: 20px;
    left: 32px;
    transform: translateX(-50%);
}
</style>
