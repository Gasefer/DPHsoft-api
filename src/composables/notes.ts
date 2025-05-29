import { Note } from "./interfaces";

let notes: Note[] = [];

export const fetchNotes = async (): Promise<Note[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(notes), 300));
};

export const saveNote = async (note: Note): Promise<Note> => {
  if (!note.id) {
    note.id = Date.now().toString();
    notes.push(note);
  } else {
    notes = notes.map((n) => (n.id === note.id ? note : n));
  }
  return new Promise((resolve) => setTimeout(() => resolve(note), 300));
};

export const deleteNote = async (id: string): Promise<void> => {
  notes = notes.filter((n) => n.id !== id);
  return new Promise((resolve) => setTimeout(resolve, 300));
};
