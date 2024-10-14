<template>
    <n-flex vertical class="timeline-container" ref="timelineContainer">
        <TimelineNode
            v-for="node in nodes"
            :key="node.id"
            :title="node.title"
            :description="node.description"
            :weekday="formatWeekday(node.date)"
            :monthday="formatMonthday(node.date)"
        />
    </n-flex>
</template>

<script lang="ts" setup>
import TimelineNode from "@/components/TimelineNode.vue";
import { onMounted, ref } from "vue";
import { NFlex } from "naive-ui";
import axios from "axios";
import { ITimelineNode } from "@/interfaces";

const nodes = ref<ITimelineNode[]>([]);
const timelineContainer = ref<HTMLElement | null>(null);

const formatWeekday = (date: string): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { weekday: "short" });
};

const formatMonthday = (date: string): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { day: "2-digit" });
};

// TODO: Replace this with a real API endpoint

onMounted(async () => {
    try {
        const response = await axios.get("/testNodeData.json");
        nodes.value = response.data;
    } catch (error) {
        console.error("Error fetching timeline data:", error);
    }
});
</script>

<style scoped>
.timeline-container {
    position: relative;
    left: 60px;
    width: 100%;
    max-width: calc(100% - 60px);
}

/* The line */
:root {
    --line-top: 0;
    --line-height: 100%;
}

.timeline-container::before {
    content: "";
    position: absolute;
    left: -35px;
    top: var(--line-top, 0);
    width: 2px;
    height: var(--line-height, 100%);
    background-color: #eeeeee;
    border-radius: 1px;
}
</style>
