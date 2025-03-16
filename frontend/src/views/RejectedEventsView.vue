<template>
    <div style="max-width: 768px; margin: 40px auto">
        <n-card>
            <h1>Rejected Events</h1>
            <n-list>
                <n-list-item v-for="event in rejectedEvents" :key="event._id">
                    <n-space>
                        <div>
                            <h2>{{ event.title }}</h2>
                            <n-tag
                                v-for="tag in event.tags"
                                :key="tag"
                                style="margin-right: 7px"
                                >{{ tag }}
                            </n-tag>
                            <p>{{ event.briefDescription }}</p>
                            <p>{{ event.longDescription }}</p>
                        </div>
                        <n-space>
                            <n-button
                                type="success"
                                @click="restoreEvent(event._id)"
                                >Restore
                            </n-button>
                        </n-space>
                    </n-space>
                </n-list-item>
            </n-list>
            <div v-if="rejectedEvents.length === 0">
                <n-empty
                    description="No rejected events."
                    size="large"
                    style="margin-top: 70px; margin-bottom: 50px"
                >
                    <template #icon>
                        <n-icon>
                            <check />
                        </n-icon>
                    </template>
                </n-empty>
            </div>
        </n-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useMessage } from "naive-ui";
import { IEvent } from "@/types";
import { apiUrl } from "@/main";
import { Check } from "@icon-park/vue-next";

const rejectedEvents = ref<IEvent[]>([]);
const message = useMessage();

const fetchRejectedEvents = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/event/rejected`);
        rejectedEvents.value = response.data;
    } catch (error) {
        message.error("Failed to fetch rejected events.");
        console.log("Failed to fetch rejected events.");
        console.log(error);
    }
};

const restoreEvent = async (eventId: string) => {
    try {
        await axios.post(`${apiUrl}/api/event/restore`, { eventId });
        message.success("Event restored.");
        await fetchRejectedEvents();
    } catch (error) {
        message.error("Failed to restore event.");
        console.log("Failed to restore event.");
        console.log(error);
    }
};

onMounted(fetchRejectedEvents);
</script>

<style scoped></style>
