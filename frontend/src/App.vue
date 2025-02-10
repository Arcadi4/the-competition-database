<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <n-layout has-sider position="absolute" style="max-height: 100%">
                <n-layout
                    ref="headerLayoutRef"
                    :native-scrollbar="false"
                    content-class="router-view"
                >
                    <global-sidebar />
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
import themeOverrides from "@/theme/override.json";
import GlobalSidebar from "@/components/GlobalSidebar.vue";
</script>

<style>
@import "@/assets/style.css";
</style>
