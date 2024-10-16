<template>
    <n-flex style="width: 768px" vertical>
        <n-input-group style="display: flex; align-content: center; width: 50%">
            <n-input
                v-model:value="keywords"
                placeholder="Keywords..."
            ></n-input>
            <n-button
                :render-icon="() => h(Search)"
                focusable
                type="primary"
                @click="search"
            />
        </n-input-group>
        <n-flex class="timeline-container" vertical>
            <timeline-node
                v-for="event in events"
                :key="event.id"
                :description="event.briefDescription"
                :monthday="formatMonthday(event.timestamp)"
                :title="event.title"
                :weekday="formatWeekday(event.timestamp)"
            />
        </n-flex>
    </n-flex>
</template>

<script lang="ts" setup>
import { Search } from "@icon-park/vue-next";
import { h, ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import { NButton, NFlex, NInput } from "naive-ui";
import TimelineNode from "@/components/TimelineNode.vue";
import { formatMonthday, formatWeekday } from "@/utilities";
import { IEvent } from "@/interfaces";

const events = ref<IEvent[]>([]);
const keywords = ref("");

// TODO: Fix the UI
// TODO: Keyword highlighting

const search = async () => {
    const response = await axios.get(`${apiUrl}/api/event?q=${keywords.value}`);
    events.value = response.data.map((node, index) => ({
        ...node,
        id: index + 1,
    }));
};
</script>

<style>
.timeline-container {
    position: relative;
    left: 80px;
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
