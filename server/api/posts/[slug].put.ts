import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

function esc(s: string) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = join(process.cwd(), 'content', 'posts', `${slug}.md`)

  if (!existsSync(filePath)) throw createError({ statusCode: 404, message: 'Objava ne obstaja' })

  const body = await readBody(event)
  const { title, excerpt, tag, date, read, emoji, gradient, content, order } = body

  const fm = [
    `title: "${esc(title ?? '')}"`,
    `excerpt: "${esc(excerpt ?? '')}"`,
    `tag: "${esc(tag ?? '')}"`,
    `date: "${esc(date ?? '')}"`,
    `read: ${Number(read) || 5}`,
    `emoji: "${esc(emoji ?? '✨')}"`,
    `gradient: "${esc(gradient ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')

  await writeFile(filePath, `---\n${fm}\n---\n\n${content ?? ''}`, 'utf-8')
  return { success: true }
})
