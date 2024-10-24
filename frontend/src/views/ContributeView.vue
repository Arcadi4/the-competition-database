<template>
    <n-layout style="max-width: 768px">
        <n-layout-content :native-scrollbar="false">
            <n-card style="width: 500px; margin: 0 auto">
                <h1 style="margin-top: 0">Contribute to the Databse</h1>
                <n-flex size="large">
                    <n-input clearable placeholder="Event Title" />
                    <n-input
                        clearable
                        maxlength="250"
                        placeholder="Summary (250 characters maximum)"
                        show-count
                        type="textarea"
                    />
                    <n-input
                        clearable
                        placeholder="Descriptoin"
                        rows="10"
                        type="textarea"
                    />
                    <n-text
                        >Please select the date below, if the date is
                        indefinate, select the beginning of that month.
                    </n-text>
                    <n-calendar style="height: 300px" />
                    <n-button>Submit</n-button>
                </n-flex>
            </n-card>
        </n-layout-content>
    </n-layout>
</template>

<script lang="ts" setup></script>

<style scoped></style>
