<template>
    <div style="max-width: 768px; margin: 40px auto">
        <n-flex :size="40" align="center" justify="center" vertical>
            <n-card style="width: 500px">
                <h1>Contribute a New Event</h1>
                <n-form ref="formRef" :model="formValue" :rules="rules">
                    <n-form-item label="Event Title" path="title">
                        <n-input
                            v-model:value="formValue.title"
                            clearable
                            placeholder="Event Title"
                        />
                    </n-form-item>
                    <n-form-item label="Brief Summary" path="briefDescription">
                        <n-input
                            v-model:value="formValue.briefDescription"
                            :maxlength="150"
                            clearable
                            placeholder="Summary (150 characters maximum)"
                            show-count
                            type="textarea"
                        />
                    </n-form-item>
                    <n-form-item label="Description" path="longDescription">
                        <n-input
                            v-model:value="formValue.longDescription"
                            :rows="10"
                            placeholder="Description"
                            type="textarea"
                        />
                    </n-form-item>
                    <n-form-item label="Tags" path="tags">
                        <n-select
                            v-model:value="formValue.tags"
                            :options="tags"
                            multiple
                        />
                    </n-form-item>
                    <n-form-item label="Date" path="timestamp">
                        <n-date-picker
                            v-model:value="formValue.timestamp"
                            format="yyyy-MM-dd"
                            placeholder="Select Date"
                            style="width: 500px"
                        />
                    </n-form-item>
                    <n-form-item>
                        <n-button
                            attr-type="button"
                            type="primary"
                            @click="verifyAndSubmitEvent"
                        >
                            Submit
                        </n-button>
                    </n-form-item>
                </n-form>
            </n-card>
        </n-flex>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EventTags, IEventSubmission } from "@/types";
import type { FormInst, FormItemRule } from "naive-ui";
import axios from "axios";

const formRef = ref<FormInst | null>(null);
const formValue = ref<IEventSubmission>({
    title: "",
    briefDescription: "",
    longDescription: "",
    tags: [],
    timestamp: 0,
});

const rules = {
    title: [
        {
            required: true,
            message: "A title is required",
            trigger: ["input", "blur"],
        },
    ],
    briefDescription: [
        {
            required: true,
            message: "A summary is required",
            trigger: ["input", "blur"],
        },
    ],
    longDescription: [
        {
            required: true,
            message: "A description is required",
            trigger: ["input", "blur"],
        },
    ],
    timestamp: [
        {
            required: true,
            message: "A date is required",
            trigger: ["input", "blur"],
        },
    ],
};

const tags = Object.keys(EventTags)
    .filter((index: string) => !isNaN(Number(index)))
    .map((index: string) => ({
        label: EventTags[Number(index)],
        value: index,
    }));

const verifyAndSubmitEvent = (e: MouseEvent) => {
    e.preventDefault();
    console.log(formValue.value);
    // There is a crash caused by the following line
    formRef.value
        ?.validate((errors) => {
            if (!errors) {
                console.log("Event submitted");
                axios.post("/api/event/add", formValue.value);
            }
        })
        .catch((err) => {
            console.error(`Event submission failed due to: ${err}`);
        });
};
</script>

<style scoped></style>
