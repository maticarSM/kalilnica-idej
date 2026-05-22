import { createHmac } from 'node:crypto'
import { welcomeEmailHtml } from '../utils/emailHtml'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    throw createError({ statusCode: 400, message: 'Vpišite veljaven e-poštni naslov.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev fallback: simulate success so the UI can be tested without Resend
    console.warn('[subscribe] RESEND_API_KEY ni nastavljen — email ni bil poslan.')
    return { ok: true, dev: true }
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'
  const fromEmail = process.env.FROM_EMAIL || 'Kalilnica idej <onboarding@resend.dev>'

  // Add to Resend audience (ignore if contact already exists)
  if (audienceId) {
    await $fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: { email, unsubscribed: false }
    }).catch(() => {})
  }

  // Build HMAC-signed unsubscribe URL
  const token = createHmac('sha256', apiKey).update(String(email)).digest('hex').slice(0, 32)
  const unsubUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(String(email))}&token=${token}`

  // Send welcome email
  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: {
      from: fromEmail,
      to: [String(email)],
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
