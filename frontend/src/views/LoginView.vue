<template>
    <div style="max-width: 768px; margin: 40px auto">
        <n-flex :size="40" align="center" justify="center" vertical>
            <login-popup />
        </n-flex>
    </div>
</template>

<script lang="ts" setup>
import LoginPopup from "@/components/PopupLogin.vue";
</script>

<style scoped></style>
