<template>
    <n-input placeholder="Search..." round style="max-width: 768px; width: 50%">
        <template #suffix>
            <search fill="#888" style="transform: translateY(5%)" />
        </template>
    </n-input>
</template>

<script setup>
import { Search } from "@icon-park/vue-next";
</script>

<style></style>
