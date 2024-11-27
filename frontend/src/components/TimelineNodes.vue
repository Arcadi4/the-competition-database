<template>
    <n-flex
        :key="eventsKey"
        class="timeline-container"
        style="
            position: relative;
            left: 60px;
            width: calc(100% - 80px);
            padding: 20px 0;
        "
        vertical
    >
        <template v-for="(event, index) in props.events" :key="event._id">
            <div
                v-if="isNewMonth(index)"
                class="month-indicator"
                style="color: #b4b4b4; display: flex; align-items: baseline"
            >
                <h2 style="margin-right: 10px">
                    {{ formatMonth(event.timestamp) }}
                </h2>
                {{ formatYear(event.timestamp) }}
            </div>
            <timeline-node
                :description="event.briefDescription"
                :highlight-patterns="highlightPatterns"
                :monthday="formatMonthday(event.timestamp)"
                :title="event.title"
                :weekday="formatWeekday(event.timestamp)"
                @click="() => emitEventClick(event)"
            />
        </template>
    </n-flex>
</template>

<script lang="ts" setup>
import TimelineNode from "@/components/TimelineNode.vue";
import { computed, defineEmits, defineProps } from "vue";
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

const eventsKey = computed(() => JSON.stringify(props.events));
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

.month-indicator {
    font-weight: bold;
    margin: 10px 0;
}
</style>
