<template>
    <div style="max-width: 768px; margin: 40px auto">
        <n-flex :size="40" align="center" justify="center">
            <n-card style="width: 500px">
                <h1>Contribute a New Event</h1>
                <n-form
                    ref="formRef"
                    :model="formValue"
                    :rules="contribution.formRules"
                >
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
                            @click="handleSubmitClick"
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
import { onMounted, ref, watch } from "vue";
import { FormInst, useMessage } from "naive-ui";
import { contribution } from "./contribution";
import { EventTags, IEventSubmission } from "@/types";

const message = useMessage();

const formRef = ref<FormInst | null>(null);
const formValue = ref<IEventSubmission>({
    title: "",
    briefDescription: "",
    longDescription: "",
    tags: [],
    timestamp: new Date().setHours(0, 0, 0, 0),
});

// restore form value from local storage
onMounted(() => {
    const savedFormValue = localStorage.getItem("formValue");
    if (savedFormValue) {
        formValue.value = JSON.parse(savedFormValue);
    }
});

// listen to form value changes
watch(
    formValue,
    (newValue) => {
        localStorage.setItem("formValue", JSON.stringify(newValue));
    },
    { deep: true }
);

const tags = Object.keys(EventTags)
    .filter((index: string) => !isNaN(Number(index)))
    .map((index: string) => ({
        label: EventTags[Number(index)],
        value: index,
    }));

const handleSubmitClick = async () => {
    try {
        if (formRef.value) {
            await contribution.submitEvent(
                formRef.value,
                formValue.value,
                message
            );
            // clear form value
            formValue.value = {
                title: "",
                briefDescription: "",
                longDescription: "",
                tags: [],
                timestamp: new Date().setHours(0, 0, 0, 0),
            };
            localStorage.removeItem("formValue");
        }
    } catch (error) {
        message.error("Failed to submit event");
        console.log(error);
    }
};
</script>
