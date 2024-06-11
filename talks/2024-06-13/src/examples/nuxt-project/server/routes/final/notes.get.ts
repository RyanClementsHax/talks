import { getNotes } from '../../db/notes'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  return getNotes()
})
