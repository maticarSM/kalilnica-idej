import { createHmac } from 'node:crypto'
import { welcomeEmailHtml } from '../utils/emailHtml'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    throw createError({ statusCode: 400, message: 'Neveljaven e-poštni naslov.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 503, message: 'E-poštna storitev ni konfigurirana.' })
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'
  const fromEmail = process.env.FROM_EMAIL || 'Kalilnica idej <onboarding@resend.dev>'

  // Add to Resend audience (ignore duplicate errors)
  if (audienceId) {
    await $fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: { email, unsubscribed: false }
    }).catch(() => {})
  }

  // Build unsubscribe URL with HMAC token
  const token = createHmac('sha256', apiKey).update(String(email)).digest('hex').slice(0, 32)
  const unsubUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(String(email))}&token=${token}`

  // Send welcome email
  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: {
      from: fromEmail,
      to: [email],
      subject: 'Dobrodošli v Kalilnici idej! 🌱',
      html: welcomeEmailHtml(unsubUrl),
      headers: {
        'List-Unsubscribe': `<${unsubUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      }
    }
  })

  return { ok: true }
})
