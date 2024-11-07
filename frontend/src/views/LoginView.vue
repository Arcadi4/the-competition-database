<template>
    <div style="max-width: 768px; margin: 0 auto; padding-top: 40px">
        <n-flex :size="40" align="center" justify="center" vertical>
            <n-card style="width: 500px">
                <h1 style="margin-top: 0">Login</h1>
                <n-flex vertical>
                    <n-button size="large">
                        Login Through
                        <n-icon size="100" style="left: 10px">
                            <img alt="Microsoft" src="/microsoft.svg" />
                        </n-icon>
                    </n-button>
                    <n-input placeholder="Admin key (for admin login)" />
                </n-flex>
            </n-card>
        </n-flex>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
