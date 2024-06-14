let notes: { id: number; text: string }[] = []

export function getNotes() {
  return notes
}

let id = 0
export function addNote(text: string) {
  notes.push({ id: id++, text })
}

export function deleteNote(id: number) {
  notes = notes.filter((x) => x.id !== id)
}
