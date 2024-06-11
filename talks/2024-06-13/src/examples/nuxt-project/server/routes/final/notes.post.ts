import { addNote } from '../../db/notes'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { text } = await readBody(event)
  addNote(text)
})
