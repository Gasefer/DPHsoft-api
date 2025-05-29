<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import type { Note } from "~/composables/interfaces";

const props = defineProps<{ note: Note }>();
const emit = defineEmits<{
  (e: "edit", note: Note): void;
  (e: "delete", id: string): void;
}>();

const onEdit = () => emit("edit", props.note);
const onDelete = () => emit("delete", props.note.id);
</script>

<template>
  <li
    class="flex justify-between items-center border p-3 rounded cursor-pointer hover:bg-gray-50"
  >
    <span @click="onEdit" class="flex-1">{{
      note.title || "Без заголовка"
    }}</span>
    <button
      @click.stop="onDelete"
      class="ml-4 text-red-600 hover:text-red-800"
      aria-label="Видалити нотатку"
    >
      Видалити
    </button>
  </li>
</template>
