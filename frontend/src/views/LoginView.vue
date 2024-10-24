<template>
    <n-layout style="max-width: 768px">
        <n-layout-content
            :native-scrollbar="false"
            content-style="padding: 20px"
            style="margin: 0 auto"
        >
            <n-card style="width: 500px; margin: 0 auto">
                <h1 style="margin-top: 0">Login</h1>
                <n-flex vertical>
                    <n-button size="large">
                        Login Through
                        <n-icon size="100" style="padding-left: 10px">
                            <img alt="Microsoft" src="/microsoft.svg" />
                        </n-icon>
                    </n-button>
                    <n-input placeholder="Admin key (for admin login)" />
                </n-flex>
            </n-card>
        </n-layout-content>
    </n-layout>
</template>

<script lang="ts" setup></script>

<style scoped></style>
