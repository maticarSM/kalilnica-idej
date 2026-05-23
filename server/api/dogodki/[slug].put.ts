import { esc, writeContent } from '../../utils/contentCrud'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  if (!existsSync(join(process.cwd(), 'content', 'dogodki', `${slug}.md`)))
    throw createError({ statusCode: 404, message: 'Dogodek ne obstaja' })
  const { title, emoji, date, location, link, content, order } = await readBody(event)
  const fm = [
    `title: "${esc(title ?? '')}"`,
    `emoji: "${esc(emoji ?? '📅')}"`,
    `date: "${esc(date ?? '')}"`,
    `location: "${esc(location ?? '')}"`,
    `link: "${esc(link ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')
  await writeContent('dogodki', slug, fm, content ?? '')
  return { success: true }
})
