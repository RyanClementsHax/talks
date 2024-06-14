export default defineEventHandler(async (event) => {
  const { text } = await readBody(event)
  addNote(text)
})
