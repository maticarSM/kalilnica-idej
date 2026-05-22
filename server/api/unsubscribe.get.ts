import { createHmac } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const { email, token } = getQuery(event)

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'

  if (!apiKey || !email || !token) {
    return sendRedirect(event, `${siteUrl}/?unsub=error`, 302)
  }

  const expected = createHmac('sha256', apiKey).update(String(email)).digest('hex').slice(0, 32)
  if (token !== expected) {
    return sendRedirect(event, `${siteUrl}/?unsub=error`, 302)
  }

  // Mark contact as unsubscribed in Resend audience
  if (audienceId) {
    const contacts: any = await $fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    ).catch(() => null)

    const contact = contacts?.data?.find((c: any) => c.email === email)
    if (contact?.id) {
      await $fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: { unsubscribed: true }
      }).catch(() => {})
    }
  }

  return sendRedirect(event, `${siteUrl}/?unsub=ok`, 302)
})
