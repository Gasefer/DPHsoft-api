// export interface Note {
//   id: string | null;
//   title: string;
//   content: string;
// }
export class Note {
  id: string;
  title: string;
  content: string;
}

export function createEmptyNote(): Note {
  return {
    id: "",
    title: "",
    content: "",
  };
}
