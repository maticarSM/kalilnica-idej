import { esc, writeContent } from '../../utils/contentCrud'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  if (!existsSync(join(process.cwd(), 'content', 'projekti', `${slug}.md`)))
    throw createError({ statusCode: 404, message: 'Projekt ne obstaja' })
  const { title, emoji, num, subtitle, link, content, order } = await readBody(event)
  const fm = [
    `title: "${esc(title ?? '')}"`,
    `emoji: "${esc(emoji ?? '🚀')}"`,
    `num: "${esc(num ?? '01')}"`,
    `subtitle: "${esc(subtitle ?? '')}"`,
    `link: "${esc(link ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')
  await writeContent('projekti', slug, fm, content ?? '')
  return { success: true }
})
