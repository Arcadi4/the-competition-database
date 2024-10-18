<template>
    <timeline-nodes :events="allEvents" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { IEvent } from "@/interfaces";
import { apiUrl } from "@/main";
import TimelineNodes from "@/components/TimelineNodes.vue";

// TODO: Use dynamic loading rather than loading all events at once

const allEvents = ref<IEvent[]>([]);

onMounted(async () => {
    const response = await axios.get(`${apiUrl}/api/event/all`);
    allEvents.value = response.data.map((node: IEvent, index: number) => ({
        ...node,
        id: index + 1,
    }));
});
</script>

<style></style>
