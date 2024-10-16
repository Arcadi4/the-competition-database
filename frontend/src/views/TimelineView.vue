<template>
    <n-flex ref="timelineContainer" class="timeline-container" vertical>
        <timeline-node
            v-for="node in events"
            :key="node.id"
            :description="node.briefDescription"
            :monthday="formatMonthday(node.timestamp)"
            :title="node.title"
            :weekday="formatWeekday(node.timestamp)"
        />
    </n-flex>
</template>

<script lang="ts" setup>
import TimelineNode from "@/components/TimelineNode.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { IEvent } from "@/interfaces";
import { apiUrl } from "@/main";
import { formatMonthday, formatWeekday } from "@/utilities";

const events = ref<IEvent[]>([]);
const timelineContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
    const response = await axios.get(`${apiUrl}/api/event/all`);
    events.value = response.data.map((node: IEvent, index: number) => ({
        ...node,
        id: index + 1,
    }));
});
</script>

<style scoped>
.timeline-container {
    position: relative;
    left: 80px;
    width: calc(100% - 120px);
    max-width: 768px;
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
