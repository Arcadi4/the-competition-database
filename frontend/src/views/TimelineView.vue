<template>
    <n-split
        :default-size="0.6"
        :max="0.75"
        :min="0.34"
        direction="horizontal"
        style="height: 100vh"
    >
        <template #1>
            <n-layout>
                <n-layout-content embedded>
                    <n-button
                        circle
                        class="contribute-button"
                        type="primary"
                        @click="() => router.push('/contribute')"
                    >
                        <Edit />
                    </n-button>
                    <event-timeline
                        :events="allEvents"
                        @event-click="handleEventClick"
                    />
                </n-layout-content>
            </n-layout>
        </template>
        <template #2>
            <n-layout>
                <n-layout-content
                    content-style="
                        margin: 0 auto;
                        max-width: 768px;
                        padding: 20px;
                        height: 100vh;
                    "
                >
                    <article-viewer
                        v-if="selectedEvent"
                        :abstract="selectedEvent?.briefDescription"
                        :content="selectedEvent?.longDescription"
                        :date="new Date(selectedEvent?.timestamp)"
                        :title="selectedEvent?.title"
                        author="The Competition Database"
                    />
                    <n-empty
                        v-if="!selectedEvent"
                        description="Click on events to show detail"
                        style="margin-top: 45vh"
                    />
                </n-layout-content>
            </n-layout>
        </template>
    </n-split>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import EventTimeline from "@/components/TimelineEvent.vue";
import ArticleViewer from "@/components/ViewerGeneral.vue";
import router from "@/router";
import { Edit } from "@icon-park/vue-next";
import { IEvent } from "../../../backend/src/shared/types"; // TODO: Use dynamic loading rather than loading all events at once

// TODO: Use dynamic loading rather than loading all events at once

const allEvents = ref<IEvent[]>([]);

onMounted(async () => {
    const response = await axios.get(`${apiUrl}/api/event/all`);
    allEvents.value = response.data.map((node: IEvent) => ({
        ...node,
        id: node._id,
    }));
});

const selectedEvent = ref<IEvent | null>(null);

const handleEventClick = (event: IEvent) => {
    selectedEvent.value = event;
};
</script>

<style>
.contribute-button {
    position: absolute;
    top: 40px;
    right: 30px;
    z-index: 20;
}
</style>
