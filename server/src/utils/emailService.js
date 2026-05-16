const nodemailer = require('nodemailer');

// ─── Transporter (lazy-initialized) ──────────────────────
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

// ─── Send generic email ──────────────────────────────────
async function sendEmail({ to, subject, html, text }) {
  try {
    const transport = getTransporter();
    const info = await transport.sendMail({
      from: `"${process.env.FROM_NAME || 'Kinetic Orange'}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || '',
      html: html || '',
    });
    console.log('[EMAIL] Sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[EMAIL] Failed to send:', error.message);
    return { success: false, error: error.message };
  }
}

// ─── Contact form notification email ─────────────────────
async function sendContactNotification(contact) {
  const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border: 2px solid #ff6b00;">
      <div style="background: #ff6b00; padding: 20px 30px;">
        <h1 style="margin: 0; color: #000; font-size: 20px; font-weight: 800; letter-spacing: 2px;">NEW CONTACT MESSAGE</h1>
      </div>
      <div style="padding: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; width: 120px; vertical-align: top;">NAME</td>
            <td style="padding: 10px 0; color: #ccc;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">EMAIL</td>
            <td style="padding: 10px 0; color: #ccc;"><a href="mailto:${contact.email}" style="color: #ff6b00;">${contact.email}</a></td>
          </tr>
          ${contact.phone ? `<tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">PHONE</td>
            <td style="padding: 10px 0; color: #ccc;"><a href="tel:${contact.phone}" style="color: #ff6b00;">${contact.phone}</a></td>
          </tr>` : ''}
          ${contact.company ? `<tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">COMPANY</td>
            <td style="padding: 10px 0; color: #ccc;">${contact.company}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">SUBJECT</td>
            <td style="padding: 10px 0; color: #ccc;">${contact.subject}</td>
          </tr>
          ${contact.service ? `<tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">SERVICE</td>
            <td style="padding: 10px 0; color: #ccc;">${contact.service}</td>
          </tr>` : ''}
          ${contact.budget ? `<tr>
            <td style="padding: 10px 0; color: #ff6b00; font-weight: 600; vertical-align: top;">BUDGET</td>
            <td style="padding: 10px 0; color: #ccc;">${contact.budget}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding: 20px; background: #111; border-left: 3px solid #ff6b00;">
          <p style="color: #ff6b00; font-weight: 600; margin: 0 0 10px;">MESSAGE</p>
          <p style="color: #ccc; margin: 0; line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
        </div>
        <p style="color: #555; font-size: 12px; margin-top: 30px;">
          Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          ${contact.ip ? ` | IP: ${contact.ip}` : ''}
        </p>
      </div>
    </div>
  `;

  const text = `NEW CONTACT MESSAGE
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || 'N/A'}
Company: ${contact.company || 'N/A'}
Subject: ${contact.subject}
Service: ${contact.service || 'N/A'}
Budget: ${contact.budget || 'N/A'}

MESSAGE:
${contact.message}

Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  return sendEmail({
    to: adminEmail,
    subject: `🔔 New Contact: ${contact.subject} — ${contact.name}`,
    html,
    text,
  });
}

module.exports = { sendEmail, sendContactNotification };
