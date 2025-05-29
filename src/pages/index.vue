<script setup lang="ts">
import type { Note } from "../composables/interfaces";
import { createEmptyNote } from "../composables/interfaces";
import { fetchNotes, saveNote, deleteNote } from "../composables/notes";

const notes = ref<Note[]>([]);
const editingNote = ref<Note | null>(null);
const isFormVisible = ref(false);

const loadNotes = async () => {
  notes.value = await fetchNotes();
};

onMounted(loadNotes);

const onSave = async (note: Note) => {
  await saveNote(note);
  await loadNotes();
  isFormVisible.value = false;
};

const onEdit = (note: Note) => {
  editingNote.value = { ...note };
  isFormVisible.value = true;
};

const onDelete = async (id: string) => {
  await deleteNote(id);
  await loadNotes();
};

const onAdd = () => {
  editingNote.value = createEmptyNote();
  isFormVisible.value = true;
};
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <h3 class="text-2xl font-semibold text-gray-800 mb-6">Notes</h3>
    <button
      @click="onAdd"
      class="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Додати нотатку
    </button>

    <div v-if="isFormVisible && editingNote" class="mb-6">
      <NoteForm :initialNote="editingNote" :onSave="onSave" />
    </div>

    <ul class="space-y-2">
      <li
        v-for="note in notes"
        :key="note.id"
        class="flex justify-between items-center border p-3 rounded cursor-pointer hover:bg-gray-50"
      >
        <span @click="onEdit(note)" class="flex-1">{{
          note.title || "Без заголовка"
        }}</span>
        <button
          @click="onDelete(note.id)"
          class="ml-4 text-red-600 hover:text-red-800 cursor-pointer"
          aria-label="Видалити нотатку"
        >
          Видалити
        </button>
      </li>
    </ul>
  </div>
</template>
