<template>
    <n-flex :wrap="false" class="timeline-node">
        <div class="side-date-display">
            <p style="line-height: 0">{{ weekday }}</p>
            <h1 style="line-height: 0">{{ monthday }}</h1>
        </div>
        <n-card hoverable size="small" style="padding: 5px">
            <div style="font-size: medium; font-weight: bold" v-html="title" />
            <div v-html="description" />
        </n-card>
    </n-flex>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    title: String,
    description: String,
    weekday: String,
    monthday: String,
});
</script>

<style scoped>
.timeline-node {
    display: flex;
    align-items: stretch;
    position: relative;
    width: 100%;
    max-width: 100%;
}

/* Dots */
.timeline-node::before {
    content: "";
    position: absolute;
    left: -34px;
    top: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background-color: #b4b4b4;
    border-radius: 50%;
}

.side-date-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    margin: 10px;
    color: #b4b4b4;
}
</style>
