import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = join(process.cwd(), 'content', 'posts', `${slug}.md`)

  if (!existsSync(filePath)) throw createError({ statusCode: 404, message: 'Objava ne obstaja' })

  await unlink(filePath)
  return { success: true }
})
