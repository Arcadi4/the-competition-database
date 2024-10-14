<template>
    <n-flex ref="timelineContainer" class="timeline-container" vertical>
        <TimelineNode
            v-for="node in nodes"
            :key="node.id"
            :description="node.description"
            :monthday="formatMonthday(node.date)"
            :title="node.title"
            :weekday="formatWeekday(node.date)"
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

const formatWeekday = (date: Date): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { weekday: "short" });
};

const formatMonthday = (date: Date): string => {
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
    left: 40px;
    width: calc(100% - 120px);
    max-width: calc(768px);
}

.timeline-container::before {
    content: "";
    position: absolute;
    left: -35px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #eeeeee;
    border-radius: 1px;
}
</style>
