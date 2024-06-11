import { deleteNote } from '../../../db/notes'
import { defineEventHandler, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  deleteNote(Number(id))
})
