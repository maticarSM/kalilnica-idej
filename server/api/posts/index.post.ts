import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

function esc(s: string) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, title, excerpt, tag, date, read, emoji, gradient, content, order } = body

  if (!slug || !title) throw createError({ statusCode: 400, message: 'Manjka slug ali naslov' })

  const postsDir = join(process.cwd(), 'content', 'posts')
  if (!existsSync(postsDir)) await mkdir(postsDir, { recursive: true })

  const fm = [
    `title: "${esc(title)}"`,
    `excerpt: "${esc(excerpt ?? '')}"`,
    `tag: "${esc(tag ?? '')}"`,
    `date: "${esc(date ?? '')}"`,
    `read: ${Number(read) || 5}`,
    `emoji: "${esc(emoji ?? '✨')}"`,
    `gradient: "${esc(gradient ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')

  const file = `---\n${fm}\n---\n\n${content ?? ''}`
  await writeFile(join(postsDir, `${slug}.md`), file, 'utf-8')

  return { success: true, slug }
})
