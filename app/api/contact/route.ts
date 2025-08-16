// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const to = process.env.CONTACT_TO
    if (!to) {
      return Response.json(
        { ok: false, error: 'CONTACT_TO is not set on server.' },
        { status: 500 }
      )
    }

    const { name, email, message } = await req.json()

    // Validasi dasar
    const errors: string[] = []
    if (!name || String(name).trim().length < 2) errors.push('Nama minimal 2 karakter.')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) errors.push('Email tidak valid.')
    if (!message || String(message).trim().length < 10)
      errors.push('Pesan minimal 10 karakter.')

    if (errors.length) {
      return Response.json({ ok: false, errors }, { status: 400 })
    }

    const from = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'
    const subject = `New contact — ${name}`

    const text = [
      `Nama   : ${name}`,
      `Email  : ${email}`,
      '',
      'Pesan:',
      String(message || '').trim(),
    ].join('\n')

    const html = `
      <h2>New contact</h2>
      <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Pesan:</strong></p>
      <p>${escapeHtml(String(message || '').trim()).replace(/\n/g, '<br/>')}</p>
    `

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email, // reply langsung ke pengirim
    })

    if (error) {
      return Response.json({ ok: false, error: String(error) }, { status: 500 })
    }

    return Response.json({ ok: true }, { status: 200 })
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err?.message || 'Unexpected error' },
      { status: 500 }
    )
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
