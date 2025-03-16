<template>
    <n-card style="width: 500px">
        <h1 style="margin-top: 0">Login</h1>
        <n-flex vertical>
            <n-button size="large" @click="loginWithMicrosoft">
                Login Through
                <n-icon size="100" style="left: 10px">
                    <img alt="Microsoft" src="/microsoft.svg" />
                </n-icon>
            </n-button>
        </n-flex>
    </n-card>
</template>

<script lang="ts" setup>
const loginWithMicrosoft = () => {
    window.location.href = "/auth/microsoft";
};
</script>

<style scoped></style>
