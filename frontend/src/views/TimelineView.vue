<template>
    <n-split
        :default-size="0.67"
        :max="0.75"
        :min="0.34"
        direction="horizontal"
        style="height: calc(100vh - 100px)"
    >
        <template #1>
            <n-layout>
                <n-layout-content
                    :native-scrollbar="false"
                    content-style="
                                  max-width: 768px;
                                  padding: 20px;
                                  height: calc(100vh - 100px);
                "
                >
                    <timeline-nodes :events="allEvents" />
                </n-layout-content>
            </n-layout>
        </template>
        <template #2>
            <n-layout>
                <n-layout-content
                    content-style="
                max-width: 768px;
                padding: 20px;
                height: calc(100vh - 100px);
                "
                >
                    <n-empty description="Click on events to show detail" />
                </n-layout-content>
            </n-layout>
        </template>
    </n-split>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { IEvent } from "@/types";
import { apiUrl } from "@/main";
import TimelineNodes from "@/components/TimelineNodes.vue"; // TODO: Use dynamic loading rather than loading all events at once

// TODO: Use dynamic loading rather than loading all events at once

const allEvents = ref<IEvent[]>([]);

onMounted(async () => {
    const response = await axios.get(`${apiUrl}/api/event/all`);
    allEvents.value = response.data.map((node: IEvent, index: number) => ({
        ...node,
        id: node._id,
    }));
});
</script>

<style></style>
