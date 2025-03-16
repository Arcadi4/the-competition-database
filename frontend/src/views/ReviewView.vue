<template>
    <div style="max-width: 768px; margin: 40px auto">
        <n-card>
            <h1>Review Pending Events</h1>
            <n-list>
                <n-list-item v-for="event in pendingEvents" :key="event._id">
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
                                @click="approveEvent(event._id)"
                                >Approve
                            </n-button>
                            <n-button
                                type="error"
                                @click="rejectEvent(event._id)"
                                >Reject
                            </n-button>
                        </n-space>
                    </n-space>
                </n-list-item>
            </n-list>
            <div v-if="pendingEvents.length === 0">
                <n-empty
                    description="All events reviewed, congrats!"
                    size="large"
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

const pendingEvents = ref<IEvent[]>([]);
const message = useMessage();

const fetchPendingEvents = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/event/pending`);
        pendingEvents.value = response.data;
    } catch (error) {
        message.error("Failed to fetch pending events.");
        console.log("Failed to fetch pending events.");
        console.log(error);
    }
};

const approveEvent = async (eventId: string) => {
    try {
        await axios.post(`${apiUrl}/api/event/approve`, { eventId });
        message.success("Event approved.");
        await fetchPendingEvents();
    } catch (error) {
        message.error("Failed to approve event.");
        console.log("Failed to approve event.");
        console.log(error);
    }
};

const rejectEvent = async (eventId: string) => {
    try {
        await axios.post(`${apiUrl}/api/event/reject`, { eventId });
        message.success("Event rejected.");
        await fetchPendingEvents();
    } catch (error) {
        message.error("Failed to reject event.");
        console.log("Failed to reject event.");
        console.log(error);
    }
};

onMounted(fetchPendingEvents);
</script>

<style scoped></style>
