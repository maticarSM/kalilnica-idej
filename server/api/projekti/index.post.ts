import { esc, writeContent } from '../../utils/contentCrud'
export default defineEventHandler(async (event) => {
  const { slug, title, emoji, num, subtitle, link, content, order } = await readBody(event)
  if (!slug || !title) throw createError({ statusCode: 400, message: 'Manjka slug ali naslov' })
  const fm = [
    `title: "${esc(title)}"`,
    `emoji: "${esc(emoji ?? '🚀')}"`,
    `num: "${esc(num ?? '01')}"`,
    `subtitle: "${esc(subtitle ?? '')}"`,
    `link: "${esc(link ?? '')}"`,
    `order: ${Number(order) || Date.now()}`,
  ].join('\n')
  await writeContent('projekti', slug, fm, content ?? '')
  return { success: true, slug }
})
