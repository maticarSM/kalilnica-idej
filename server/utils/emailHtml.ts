const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'

function base(title: string, body: string, unsubUrl: string): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#07070f;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#07070f;">
  <tr><td style="padding:48px 20px 40px;">

    <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width:560px;width:100%;margin:0 auto;background:#0d0d1f;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#4F46E5 0%,#06B6D4 100%);padding:36px 44px 32px;">
          <p style="margin:0;color:#fff;font-size:21px;font-weight:700;letter-spacing:-0.4px;font-family:Arial,Helvetica,sans-serif;">&#127807; Kalilnica idej</p>
          <p style="margin:7px 0 0;color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:3.5px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">kjer ideje kalijo</p>
        </td>
      </tr>

      <!-- Body -->
      <tr><td style="padding:40px 44px;">${body}</td></tr>

      <!-- Divider -->
      <tr><td style="height:1px;background:rgba(255,255,255,0.06);font-size:1px;line-height:1px;">&nbsp;</td></tr>

      <!-- Footer -->
      <tr>
        <td style="padding:22px 44px;text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(238,242,255,0.22);line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
            &#169; 2026 Kalilnica idej &nbsp;&middot;&nbsp;
            <a href="${siteUrl}" style="color:rgba(238,242,255,0.22);text-decoration:none;">Spletna stran</a>
            &nbsp;&middot;&nbsp;
            <a href="${unsubUrl}" style="color:rgba(238,242,255,0.22);text-decoration:underline;">Odjava od obvestil</a>
          </p>
        </td>
      </tr>

    </table>

    <!-- Bottom note -->
    <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width:560px;width:100%;margin:20px auto 0;">
      <tr><td style="text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(238,242,255,0.15);font-family:Arial,Helvetica,sans-serif;">
          To sporočilo ste prejeli, ker ste se naročili na Kalilnica idej.
        </p>
      </td></tr>
    </table>

  </td></tr>
</table>
</body>
</html>`
}

export function welcomeEmailHtml(unsubUrl: string): string {
  const body = `
    <p style="margin:0 0 6px;text-align:center;font-size:44px;line-height:1.2;">&#127807;</p>
    <h1 style="margin:16px 0 14px;color:#fff;font-size:26px;font-weight:700;letter-spacing:-0.5px;text-align:center;font-family:Arial,Helvetica,sans-serif;">Dobrodošli!</h1>
    <p style="margin:0 0 10px;color:rgba(238,242,255,0.6);font-size:15px;line-height:1.75;text-align:center;font-family:Arial,Helvetica,sans-serif;">
      Veseli nas, da ste del Kalilnice idej.
    </p>
    <p style="margin:0 0 32px;color:rgba(238,242,255,0.6);font-size:15px;line-height:1.75;text-align:center;font-family:Arial,Helvetica,sans-serif;">
      Ko bo objavljen nov &#269;lanek, boste med prvimi,<br/>ki bodo izvedeli &mdash; neposredno v vašem nabiralniku.
    </p>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="text-align:center;padding-bottom:36px;">
        <a href="${siteUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.3px;font-family:Arial,Helvetica,sans-serif;">
          Obi&#353;&#269;ite Kalilnico &rarr;
        </a>
      </td></tr>
    </table>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid rgba(255,255,255,0.06);">
      <tr><td style="padding-top:28px;text-align:center;">
        <p style="margin:0 0 10px;color:rgba(238,242,255,0.35);font-size:13px;font-family:Arial,Helvetica,sans-serif;">Sledite nam na Instagramu:</p>
        <a href="https://www.instagram.com/kalilnica.idej/" style="color:#818CF8;text-decoration:none;font-size:14px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">&#64;kalilnica.idej</a>
      </td></tr>
    </table>
  `
  return base('Dobrodošli v Kalilnici idej!', body, unsubUrl)
}

export function postNotificationHtml(post: {
  title: string, excerpt: string, slug: string,
  emoji?: string, tag?: string, date?: string, read?: number
}, unsubUrl: string): string {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const body = `
    <p style="margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(238,242,255,0.35);font-family:Arial,Helvetica,sans-serif;">Nova objava</p>

    <p style="margin:0 0 4px;text-align:center;font-size:52px;line-height:1.1;">${post.emoji || '&#128161;'}</p>

    ${post.tag ? `<p style="margin:14px 0 8px;display:inline-block;background:rgba(79,70,229,0.15);border:1px solid rgba(79,70,229,0.3);color:#818CF8;padding:4px 12px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${post.tag}</p>` : ''}

    <h2 style="margin:12px 0 16px;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.3px;line-height:1.35;font-family:Arial,Helvetica,sans-serif;">${post.title}</h2>

    <p style="margin:0 0 10px;color:rgba(238,242,255,0.55);font-size:15px;line-height:1.75;font-family:Arial,Helvetica,sans-serif;">${post.excerpt}</p>

    ${post.date || post.read ? `<p style="margin:0 0 32px;color:rgba(238,242,255,0.3);font-size:12px;font-family:Arial,Helvetica,sans-serif;">${post.date || ''}${post.date && post.read ? ' &nbsp;&middot;&nbsp; ' : ''}${post.read ? `${post.read} min branja` : ''}</p>` : '<br/>'}

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="text-align:center;">
        <a href="${postUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.3px;font-family:Arial,Helvetica,sans-serif;">
          Preberi &#269;lanek &rarr;
        </a>
      </td></tr>
    </table>
  `
  return base(`Nova objava: ${post.title}`, body, unsubUrl)
}
