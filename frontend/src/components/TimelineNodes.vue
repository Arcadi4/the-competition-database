<template>
    <n-flex
        class="timeline-container"
        style="position: relative; left: 60px; width: calc(100% - 80px)"
        vertical
    >
        <timeline-node
            v-for="event in props.events"
            :key="event._id"
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
import { IEvent } from "@/types";
import { formatMonthday, formatWeekday } from "@/utilities";

// eslint-disable-next-line
const props = defineProps<{
    events: IEvent[];
}>();
</script>

<style scoped>
.timeline-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: -35px;
    width: 2px;
    border-radius: 1px;
    height: 100%;
    background-color: #eeeeee;
}
</style>
