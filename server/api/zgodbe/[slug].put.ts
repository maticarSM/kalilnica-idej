import { esc, writeContent } from '../../utils/contentCrud'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  if (!existsSync(join(process.cwd(), 'content', 'zgodbe', `${slug}.md`)))
    throw createError({ statusCode: 404, message: 'Zgodba ne obstaja' })
  const { title, emoji, person, role, link, content, order } = await readBody(event)
  const fm = [
    `title: "${esc(title ?? '')}"`,
    `emoji: "${esc(emoji ?? '⭐')}"`,
    `person: "${esc(person ?? '')}"`,
    `role: "${esc(role ?? '')}"`,
    `link: "${esc(link ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')
  await writeContent('zgodbe', slug, fm, content ?? '')
  return { success: true }
})
