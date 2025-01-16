<template>
    <n-h1>{{ props.title }}</n-h1>
    <n-p depth="3">
        <div v-if="props.date">Date: {{ props.date.toLocaleDateString() }}</div>
        <div v-if="props.author">Author: {{ props.author }}</div>
    </n-p>
    <n-blockquote>{{ props.abstract }}</n-blockquote>
    <n-divider />
    <n-p> {{ props.content }}</n-p>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<
    Partial<{
        title: string;
        abstract: string;
        content: string;
        author: string;
        date: Date;
        tags: string[];
        links: string[];
    }>
>();
</script>

<style></style>
