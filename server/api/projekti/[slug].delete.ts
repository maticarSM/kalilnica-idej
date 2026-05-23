import { removeContent } from '../../utils/contentCrud'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const ok = await removeContent('projekti', slug)
  if (!ok) throw createError({ statusCode: 404, message: 'Projekt ne obstaja' })
  return { success: true }
})
