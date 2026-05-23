import { createHmac } from 'node:crypto'
import { postNotificationHtml } from '../utils/emailHtml'

export default defineEventHandler(async (event) => {
  const { password, slug } = await readBody(event)

  if (password !== 'kalilnica2026') {
    throw createError({ statusCode: 401, message: 'Napačno geslo.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) {
    throw createError({ statusCode: 503, message: 'E-poštna storitev ni konfigurirana.' })
  }

  const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'
  const fromEmail = process.env.FROM_EMAIL || 'Kalilnica idej <info@kalilnica-idej.si>'

  // Get post details
  const post: any = await $fetch(`/api/posts/${slug}`).catch(() => null)
  if (!post) throw createError({ statusCode: 404, message: 'Objava ne obstaja.' })

  // Get all non-unsubscribed contacts
  const contacts: any = await $fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  ).catch(() => ({ data: [] }))

  const active = (contacts?.data || []).filter((c: any) => !c.unsubscribed)
  if (active.length === 0) return { ok: true, sent: 0 }

  let sent = 0
  for (const contact of active) {
    const token = createHmac('sha256', apiKey).update(contact.email).digest('hex').slice(0, 32)
    const unsubUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(contact.email)}&token=${token}`

    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: {
        from: fromEmail,
        to: [contact.email],
        subject: `Nova objava: ${post.title} ${post.emoji || ''}`.trim(),
        html: postNotificationHtml(post, unsubUrl),
        headers: {
          'List-Unsubscribe': `<${unsubUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        }
      }
    }).catch(() => {})

    sent++
  }

  return { ok: true, sent }
})
