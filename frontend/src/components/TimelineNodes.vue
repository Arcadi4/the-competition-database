<template>
    <n-flex class="timeline-container" vertical>
        <timeline-node
            v-for="event in props.events"
            :key="event.id"
            :description="event.briefDescription"
            :monthday="formatMonthday(event.timestamp)"
            :title="event.title"
            :weekday="formatWeekday(event.timestamp)"
        />
    </n-flex>
</template>

<script lang="ts" setup>
import TimelineNode from "@/components/TimelineNode.vue";
import { defineProps } from "vue";
import { IEvent } from "@/interfaces";
import { formatMonthday, formatWeekday } from "@/utilities";

// eslint-disable-next-line
const props = defineProps<{
    events: IEvent[];
}>();
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
