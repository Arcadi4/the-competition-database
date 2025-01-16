<template>
    <n-split
        :default-size="0.6"
        :max="0.75"
        :min="0.34"
        direction="horizontal"
        style="height: calc(100vh - 100px)"
    >
        <template #1>
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
                    <event-timeline
                        :events="searchResults"
                        :highlight-patterns="keywords"
                    />
                    <n-empty
                        :class="
                            () => {
                                if (isNoSearchResult) return 'hidden';
                            }
                        "
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
        <template v-if="!isNoSearchResult" #2>
            <article-viewer />
        </template>
    </n-split>
</template>

<script lang="ts" setup>
import { FileFailedOne, Search } from "@icon-park/vue-next";
import { computed, h, ref, watch } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import { IEvent } from "@/types";
import EventTimeline from "@/components/TimelineEvent.vue";
import ArticleViewer from "@/components/ViewerGeneral.vue";

const searchResults = ref<IEvent[]>([]);
const keywordString = ref("");
const keywords = computed(() => {
    if (keywordString.value.trim() === "") return [];
    return keywordString.value.trim().split(" ");
});
const isNoSearchResult = ref<boolean>(false);

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
    // isNoSearchResult.value = !(
    //     keywords.value.length !== 0 && newVal.length === 0
    // );
    if (keywords.value.length !== 0 && newVal.length === 0) {
        isNoSearchResult.value = false;
    } else {
        isNoSearchResult.value = true;
    }
});
</script>

<style>
.hidden {
    display: none;
}
</style>
