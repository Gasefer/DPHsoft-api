<script setup lang="ts">
import type { Note } from "~/composables/interfaces";
import { defineEmits, defineProps } from "vue";

const props = defineProps<{ notes: Note[] }>();
const emit = defineEmits<{
  (e: "edit", note: Note): void;
  (e: "delete", id: string): void;
}>();

const onEdit = (note: Note) => emit("edit", note);
const onDelete = (id: string) => emit("delete", id);
</script>

<template>
  <ul class="space-y-2">
    <NoteItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @edit="onEdit"
      @delete="onDelete"
    />
  </ul>
</template>
