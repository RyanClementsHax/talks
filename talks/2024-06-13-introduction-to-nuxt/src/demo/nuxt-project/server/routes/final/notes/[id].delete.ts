export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  deleteNote(Number(id))
})
