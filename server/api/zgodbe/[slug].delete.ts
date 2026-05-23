import { removeContent } from '../../utils/contentCrud'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const ok = await removeContent('zgodbe', slug)
  if (!ok) throw createError({ statusCode: 404, message: 'Zgodba ne obstaja' })
  return { success: true }
})
