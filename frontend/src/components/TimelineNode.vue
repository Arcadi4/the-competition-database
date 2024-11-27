<template>
    <n-flex :wrap="false" class="timeline-node">
        <div class="side-date-display">
            <p style="line-height: 0">{{ props.weekday }}</p>
            <h1 style="line-height: 0">{{ props.monthday }}</h1>
        </div>
        <n-card hoverable size="small" style="padding: 5px">
            <div style="font-size: medium; font-weight: bold">
                <n-highlight
                    :highlight-style="{
                        background: '#18A058',
                        color: '#fff',
                    }"
                    :patterns="highlightPatterns"
                    :text="title"
                />
            </div>
            <div>
                <n-highlight
                    :highlight-style="{
                        background: '#18A058',
                        color: '#fff',
                    }"
                    :patterns="highlightPatterns"
                    :text="description"
                />
            </div>
        </n-card>
    </n-flex>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
    title: string;
    description: string;
    weekday: string;
    monthday: string;
    highlightPatterns?: string[];
}>();
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
