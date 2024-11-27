<template>
    <div style="max-width: 768px; margin: 60px auto">
        <n-flex :size="40" align="center" justify="center" vertical>
            <n-input-group style="width: 66%">
                <n-input
                    v-model:value="keywordString"
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
                :highlight-patterns="keywords"
            />

            <n-empty
                :style="{ display: noResultDisplayStyle }"
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
import { computed, h, ref, watch } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import { IEvent } from "@/types";
import TimelineNodes from "@/components/TimelineNodes.vue";

const searchResults = ref<IEvent[]>([]);
const keywordString = ref("");
const keywords = computed(() => {
    if (keywordString.value.trim() === "") return [];
    return keywordString.value.trim().split(" ");
});
const noResultDisplayStyle = ref<"none" | "">("none");

const search = async () => {
    const response = await axios.get(
        `${apiUrl}/api/event?q=${keywordString.value}`
    );
    searchResults.value = response.data.map((event: IEvent, index: number) => ({
        ...event,
        id: index + 1,
    }));
};

watch(searchResults, (newVal) => {
    if (keywords.value.length !== 0 && newVal.length === 0) {
        noResultDisplayStyle.value = "";
    } else {
        noResultDisplayStyle.value = "none";
    }
});
</script>

<style></style>
