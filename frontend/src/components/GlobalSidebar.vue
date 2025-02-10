<template>
    <n-layout-sider
        :collapsed="sideBarCollapsed"
        :collapsed-width="64"
        :width="256"
        bordered
        collapse-mode="width"
        style="height: 100vh"
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
</template>

<script lang="ts" setup>
import { menuOptions } from "@/views/menuOptions";
import { DarkMode, Left, Right } from "@icon-park/vue-next";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const sideBarCollapsed = ref(true);
const collapseSideBar = () => {
    sideBarCollapsed.value = !sideBarCollapsed.value;
};

const route = useRoute();

const activeKey = ref("");

watch(
    route,
    (newRoute) => {
        activeKey.value = newRoute.name as string;
    },
    { immediate: true }
);
</script>

<style scoped></style>
