import { ref } from "vue";
import type { Note } from "~/composables/interfaces";
import { fetchNotes, saveNote, deleteNote } from "~/composables/notes";

export function useNoteEditing() {
  const notes = ref<Note[]>([]);
  const editingNote = ref<Note | null>(null);
  const isFormVisible = ref(false);

  const loadNotes = async () => {
    notes.value = await fetchNotes();
  };

  const startEditing = (note: Note) => {
    editingNote.value = { ...note };
    isFormVisible.value = true;
  };

  const addNew = () => {
    editingNote.value = { id: "", title: "", content: "" };
    isFormVisible.value = true;
  };

  const save = async (note: Note) => {
    await saveNote(note);
    await loadNotes();
    isFormVisible.value = false;
  };

  const remove = async (id: string) => {
    await deleteNote(id);
    await loadNotes();
  };

  return {
    notes,
    editingNote,
    isFormVisible,
    loadNotes,
    startEditing,
    addNew,
    save,
    remove,
  };
}
