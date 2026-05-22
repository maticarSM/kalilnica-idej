const siteUrl = process.env.SITE_URL || 'https://kalilnica-idej.vercel.app'

function base(title: string, body: string, unsubUrl: string): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#09091a;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#09091a;">
  <tr><td style="padding:48px 20px 40px;">

    <!-- Email card -->
    <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width:580px;width:100%;margin:0 auto;background:#0d0d1f;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

      <!-- Gradient header -->
      <tr>
        <td style="background:linear-gradient(135deg,#3730a3 0%,#4F46E5 40%,#06B6D4 100%);padding:38px 48px 34px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <p style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px;font-family:Arial,Helvetica,sans-serif;">
                  &#127807;&nbsp; Kalilnica idej
                </p>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">
                  kjer ideje kalijo
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr><td style="padding:44px 48px;">${body}</td></tr>

      <!-- Thin divider -->
      <tr><td style="height:1px;background:rgba(255,255,255,0.05);font-size:1px;line-height:1px;">&nbsp;</td></tr>

      <!-- Footer -->
      <tr>
        <td style="padding:24px 48px;background:#0a0a1a;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align:center;">
                <p style="margin:0 0 10px;font-size:12px;color:rgba(238,242,255,0.2);font-family:Arial,Helvetica,sans-serif;">
                  &#169; 2026 Kalilnica idej
                  &nbsp;&middot;&nbsp;
                  <a href="${siteUrl}" style="color:rgba(238,242,255,0.2);text-decoration:none;">Spletna stran</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://www.instagram.com/kalilnica.idej/" style="color:rgba(238,242,255,0.2);text-decoration:none;">Instagram</a>
                </p>
                <p style="margin:0;font-size:11px;color:rgba(238,242,255,0.12);font-family:Arial,Helvetica,sans-serif;">
                  To sporočilo ste prejeli, ker ste se naročili na novice.
                  &nbsp;<a href="${unsubUrl}" style="color:rgba(238,242,255,0.25);text-decoration:underline;">Odjava</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
    <!-- /Email card -->

  </td></tr>
</table>
</body>
</html>`
}

// ─────────────────────────────────────────────
// WELCOME EMAIL
// ─────────────────────────────────────────────
export function welcomeEmailHtml(unsubUrl: string): string {
  const body = `
    <!-- Hero -->
    <p style="margin:0 0 4px;text-align:center;font-size:54px;line-height:1;">&#127807;</p>
    <h1 style="margin:18px 0 10px;color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.6px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
      Dobrodošli v kalilnici!
    </h1>
    <p style="margin:0 0 36px;color:rgba(238,242,255,0.5);font-size:14px;line-height:1.5;text-align:center;font-family:Arial,Helvetica,sans-serif;">
      Veseli nas, da ste del skupnosti radovednih mislecev.
    </p>

    <!-- About block -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
      <tr>
        <td style="background:rgba(79,70,229,0.08);border:1px solid rgba(79,70,229,0.2);border-radius:14px;padding:28px 32px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#818CF8;font-family:Arial,Helvetica,sans-serif;">
            Kaj je Kalilnica idej?
          </p>
          <p style="margin:0;color:rgba(238,242,255,0.7);font-size:15px;line-height:1.75;font-family:Arial,Helvetica,sans-serif;">
            Kalilnica idej je osebni blog za misli, ki ne dajo miru.
            Pišemo iskreno &mdash; brez korporativnega žargona, brez površnosti.
            O filozofiji, ustvarjalnosti, psihologiji in vsem vmes.
            O tem, kar nas navdušuje, bega ali navdihuje.
          </p>
        </td>
      </tr>
    </table>

    <!-- What you'll receive -->
    <p style="margin:0 0 16px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(238,242,255,0.4);font-family:Arial,Helvetica,sans-serif;">
      Kaj boste prejeli:
    </p>

    <!-- Feature rows -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:36px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="36" style="font-size:20px;vertical-align:top;padding-top:2px;">&#128139;</td>
              <td>
                <p style="margin:0 0 2px;color:#fff;font-size:14px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">Obvestilo pri vsaki novi objavi</p>
                <p style="margin:0;color:rgba(238,242,255,0.45);font-size:13px;font-family:Arial,Helvetica,sans-serif;">Naravnost v vaš nabiralnik &mdash; brez zamud.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="36" style="font-size:20px;vertical-align:top;padding-top:2px;">&#9997;&#65039;</td>
              <td>
                <p style="margin:0 0 2px;color:#fff;font-size:14px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">Poglobljeni &#269;lanki</p>
                <p style="margin:0;color:rgba(238,242,255,0.45);font-size:13px;font-family:Arial,Helvetica,sans-serif;">Ne hitro vsebino &mdash; misli, ki ostanejo z vami.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="36" style="font-size:20px;vertical-align:top;padding-top:2px;">&#127757;</td>
              <td>
                <p style="margin:0 0 2px;color:#fff;font-size:14px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">Sveža perspektiva</p>
                <p style="margin:0;color:rgba(238,242,255,0.45);font-size:13px;font-family:Arial,Helvetica,sans-serif;">Ideje, ki jih ne najdete povsod.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA button -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="text-align:center;padding-bottom:28px;">
        <a href="${siteUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;text-decoration:none;padding:15px 40px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.2px;font-family:Arial,Helvetica,sans-serif;">
          Obi&#353;&#269;ite Kalilnico idej &rarr;
        </a>
      </td></tr>
    </table>

    <!-- Instagram -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid rgba(255,255,255,0.06);">
      <tr><td style="padding-top:28px;text-align:center;">
        <p style="margin:0 0 12px;color:rgba(238,242,255,0.3);font-size:13px;font-family:Arial,Helvetica,sans-serif;">
          Sledite nam tudi na Instagramu za vsakodnevne misli:
        </p>
        <a href="https://www.instagram.com/kalilnica.idej/" style="display:inline-block;background:rgba(79,70,229,0.12);border:1px solid rgba(79,70,229,0.3);color:#818CF8;text-decoration:none;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">
          &#64;kalilnica.idej
        </a>
      </td></tr>
    </table>
  `
  return base('Dobrodošli v Kalilnici idej! 🌱', body, unsubUrl)
}

// ─────────────────────────────────────────────
// NEW POST NOTIFICATION EMAIL
// ─────────────────────────────────────────────
export function postNotificationHtml(post: {
  title: string, excerpt: string, slug: string,
  emoji?: string, tag?: string, date?: string, read?: number
}, unsubUrl: string): string {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const body = `
    <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#818CF8;font-family:Arial,Helvetica,sans-serif;">
      &#127807; Nova objava je tu
    </p>

    <p style="margin:0 0 6px;text-align:center;font-size:56px;line-height:1.1;">${post.emoji || '&#128161;'}</p>

    ${post.tag ? `
    <p style="margin:16px 0 10px;text-align:center;">
      <span style="display:inline-block;background:rgba(79,70,229,0.15);border:1px solid rgba(79,70,229,0.3);color:#818CF8;padding:4px 14px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${post.tag}</span>
    </p>` : ''}

    <h2 style="margin:14px 0 16px;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.4px;line-height:1.3;font-family:Arial,Helvetica,sans-serif;">${post.title}</h2>

    <p style="margin:0 0 12px;color:rgba(238,242,255,0.6);font-size:15px;line-height:1.8;font-family:Arial,Helvetica,sans-serif;">${post.excerpt}</p>

    ${(post.date || post.read) ? `
    <p style="margin:0 0 32px;color:rgba(238,242,255,0.28);font-size:12px;font-family:Arial,Helvetica,sans-serif;">
      ${post.date || ''}${post.date && post.read ? '&nbsp;&nbsp;&middot;&nbsp;&nbsp;' : ''}${post.read ? `${post.read} min branja` : ''}
    </p>` : '<br style="line-height:32px"/>'}

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="text-align:center;padding-bottom:8px;">
        <a href="${postUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;text-decoration:none;padding:15px 40px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.2px;font-family:Arial,Helvetica,sans-serif;">
          Preberi &#269;lanek &rarr;
        </a>
      </td></tr>
    </table>
  `
  return base(`Nova objava: ${post.title}`, body, unsubUrl)
}
