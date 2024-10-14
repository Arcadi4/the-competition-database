<template>
    <n-flex class="timeline-node" :wrap="false">
        <div class="side-date-display">
            <p style="line-height: 0">{{ weekday }}</p>
            <h1 style="line-height: 0">{{ monthday }}</h1>
        </div>
        <n-card :title="title" hoverable size="small">
            {{ description }}
        </n-card>
    </n-flex>
</template>

<script lang="ts" setup>
import { NCard, NFlex } from "naive-ui";
import { defineProps } from "vue";

defineProps({
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

.timeline-node {
    display: flex;
    align-items: stretch;
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
