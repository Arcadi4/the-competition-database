<template>
    <div style="display: flex; justify-content: center; height: 100%">
        <n-input
            round
            placeholder="Search..."
            style="position: relative; width: 75%; top: 50%"
        >
            <template #suffix>
                <search fill="#888" />
            </template>
        </n-input>
    </div>
</template>

<script setup>
import { Search } from "@icon-park/vue-next";
</script>

<style></style>
