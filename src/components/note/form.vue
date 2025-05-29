<script setup lang="ts">
import { defineProps } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import type { Note } from "~/composables/interfaces";

const props = defineProps<{
  initialNote: Note;
  onSave: (note: Note) => void;
}>();

const schema = yup.object({
  title: yup.string().required("Заголовок обовʼязковий"),
  content: yup.string(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialNote,
});

const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: content, errorMessage: contentError } =
  useField<string>("content");

const submit = handleSubmit((values) => {
  props.onSave({ ...props.initialNote, ...values });
  resetForm({ values });
});
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4 border p-4 rounded shadow">
    <div>
      <label class="block mb-1 font-semibold">Заголовок</label>
      <input v-model="title" type="text" class="w-full border rounded p-2" />
      <p v-if="titleError" class="text-red-600 text-sm mt-1">
        {{ titleError }}
      </p>
    </div>

    <div>
      <label class="block mb-1 font-semibold">Вміст</label>
      <textarea
        v-model="content"
        rows="5"
        class="w-full border rounded p-2"
      ></textarea>
      <p v-if="contentError" class="text-red-600 text-sm mt-1">
        {{ contentError }}
      </p>
    </div>

    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Зберегти
    </button>
  </form>
</template>
