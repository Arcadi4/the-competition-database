<template>
    <n-layout>
        <n-layout-content
            :native-scrollbar="false"
            class="timeline-container"
            content-style="
                position: relative;
                padding: 0 20px;
                padding-left: 80px;
                height: 100vh;
            "
            embedded
        >
            <div style="height: 40px" />
            <template v-for="(event, index) in props.events" :key="event._id">
                <div style="margin: 10px auto; width: inherit">
                    <div
                        v-if="isNewMonth(index)"
                        class="month-indicator"
                        style="
                            color: #b4b4b4;
                            display: flex;
                            align-items: baseline;
                        "
                    >
                        <h2 style="margin-right: 10px">
                            {{ formatMonth(event.timestamp) }}
                        </h2>
                        {{ formatYear(event.timestamp) }}
                    </div>
                    <event-timeline-node
                        :description="event.briefDescription"
                        :highlight-patterns="highlightPatterns"
                        :monthday="formatMonthday(event.timestamp)"
                        :title="event.title"
                        :weekday="formatWeekday(event.timestamp)"
                        @click="() => emitEventClick(event)"
                    />
                </div>
            </template>
            <div style="height: 60px" />
        </n-layout-content>
    </n-layout>
</template>

<script lang="ts" setup>
import EventTimelineNode from "@/components/TimelineEventNode.vue";
import { defineEmits, defineProps } from "vue";
import { IEvent } from "@/types";
import {
    formatMonth,
    formatMonthday,
    formatWeekday,
    formatYear,
} from "@/utilities";

const props = defineProps<{
    events: IEvent[];
    highlightPatterns?: string[];
}>();

const isNewMonth = (index: number) => {
    if (index === 0) return true;
    const currentEvent = props.events[index];
    const previousEvent = props.events[index - 1];
    return (
        new Date(currentEvent.timestamp).getMonth() !==
        new Date(previousEvent.timestamp).getMonth()
    );
};

const emit = defineEmits(["event-click"]);
const emitEventClick = (event: IEvent) => {
    emit("event-click", event);
};
</script>

<style scoped>
.timeline-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 45px;
    width: 2px;
    border-radius: 1px;
    height: 100%;
    background-color: rgba(178, 178, 178, 0.5);
}

.month-indicator {
    font-weight: bold;
    margin: 10px 0;
}
</style>
