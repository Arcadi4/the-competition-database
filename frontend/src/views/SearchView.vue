<template>
    <div style="max-width: 768px; margin: 60px auto">
        <n-flex :size="40" align="center" justify="center" vertical>
            <n-input-group style="width: 66%">
                <n-input
                    v-model:value="keyword"
                    autofocus
                    passively-activated
                    placeholder="Keywords..."
                    @input="search"
                ></n-input>

                <n-button
                    :render-icon="() => h(Search)"
                    focusable
                    type="primary"
                    @click="search"
                />
            </n-input-group>

            <timeline-nodes
                :events="searchResults"
                :highlight-patterns="keyword ? keyword.trim().split(' ') : []"
            />

            <n-empty
                :style="{ display: noResult }"
                description="No Results"
                size="large"
            >
                <template #icon>
                    <n-icon>
                        <file-failed-one />
                    </n-icon>
                </template>
            </n-empty>
        </n-flex>
    </div>
</template>

<script lang="ts" setup>
import { FileFailedOne, Search } from "@icon-park/vue-next";
import { h, ref, watch } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import { IEvent } from "@/types";
import TimelineNodes from "@/components/TimelineNodes.vue";

const searchResults = ref<IEvent[]>([]);
const keyword = ref("");
const noResult = ref<"none" | "">("none");

const search = async () => {
    const response = await axios.get(`${apiUrl}/api/event?q=${keyword.value}`);
    searchResults.value = response.data.map((event: IEvent, index: number) => ({
        ...event,
        id: index + 1,
    }));
};

watch(searchResults, (newVal) => {
    if (keyword.value !== "" && newVal.length === 0) {
        noResult.value = "";
    } else {
        noResult.value = "none";
    }
});
</script>

<style></style>
