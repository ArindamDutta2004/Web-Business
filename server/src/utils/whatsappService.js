const https = require('https');
const http = require('http');

/**
 * WhatsApp Notification Service
 *
 * Sends WhatsApp messages via CallMeBot free API.
 *
 * SETUP (one-time):
 * 1. Save the phone number +34 644 71 81 99 in your phone contacts (CallMeBot)
 * 2. Send "I allow callmebot to send me messages" to this number via WhatsApp
 * 3. Wait for confirmation — you'll receive an API key
 * 4. Set WHATSAPP_PHONE and WHATSAPP_APIKEY in your .env file
 *
 * Alternatively, you can set WHATSAPP_WEBHOOK_URL to use any webhook-based
 * service (like n8n, Make.com, or a custom endpoint).
 */

// ─── Send via CallMeBot API ─────────────────────────────
async function sendViaCallMeBot(phone, message) {
  const apiKey = process.env.WHATSAPP_APIKEY;
  if (!phone || !apiKey) {
    console.warn('[WHATSAPP] CallMeBot credentials not configured. Skipping.');
    return { success: false, error: 'CallMeBot not configured' };
  }

  const encodedMsg = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMsg}&apikey=${apiKey}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('[WHATSAPP] Message sent via CallMeBot');
          resolve({ success: true });
        } else {
          console.error('[WHATSAPP] CallMeBot error:', res.statusCode, data);
          resolve({ success: false, error: data });
        }
      });
    }).on('error', (err) => {
      console.error('[WHATSAPP] CallMeBot request failed:', err.message);
      resolve({ success: false, error: err.message });
    });
  });
}

// ─── Send via custom Webhook ─────────────────────────────
async function sendViaWebhook(message, contactData) {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (!webhookUrl) {
    return { success: false, error: 'Webhook URL not configured' };
  }

  const parsedUrl = new URL(webhookUrl);
  const isHttps = parsedUrl.protocol === 'https:';
  const httpModule = isHttps ? https : http;

  const payload = JSON.stringify({
    phone: process.env.WHATSAPP_PHONE,
    message,
    contact: contactData,
    timestamp: new Date().toISOString(),
  });

  return new Promise((resolve) => {
    const req = httpModule.request(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[WHATSAPP] Webhook notification sent');
          resolve({ success: true });
        } else {
          console.error('[WHATSAPP] Webhook error:', res.statusCode, data);
          resolve({ success: false, error: data });
        }
      });
    });

    req.on('error', (err) => {
      console.error('[WHATSAPP] Webhook request failed:', err.message);
      resolve({ success: false, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

// ─── Format contact message for WhatsApp ─────────────────
function formatContactMessage(contact) {
  const lines = [
    `🔔 *NEW CONTACT MESSAGE*`,
    ``,
    `👤 *Name:* ${contact.name}`,
    `📧 *Email:* ${contact.email}`,
  ];

  if (contact.phone) lines.push(`📱 *Phone:* ${contact.phone}`);
  if (contact.company) lines.push(`🏢 *Company:* ${contact.company}`);
  lines.push(`📋 *Subject:* ${contact.subject}`);
  if (contact.service) lines.push(`⚙️ *Service:* ${contact.service}`);
  if (contact.budget) lines.push(`💰 *Budget:* ${contact.budget}`);
  lines.push(``);
  lines.push(`💬 *Message:*`);
  lines.push(contact.message);
  lines.push(``);
  lines.push(`🕐 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);

  return lines.join('\n');
}

// ─── Main: Send WhatsApp contact notification ────────────
async function sendWhatsAppContactNotification(contact) {
  const phone = process.env.WHATSAPP_PHONE;
  const message = formatContactMessage(contact);

  // Try CallMeBot first
  if (process.env.WHATSAPP_APIKEY) {
    return sendViaCallMeBot(phone, message);
  }

  // Fallback to webhook
  if (process.env.WHATSAPP_WEBHOOK_URL) {
    return sendViaWebhook(message, contact);
  }

  console.warn('[WHATSAPP] No WhatsApp notification method configured. Set WHATSAPP_APIKEY or WHATSAPP_WEBHOOK_URL in .env');
  return { success: false, error: 'WhatsApp not configured' };
}

module.exports = { sendWhatsAppContactNotification };
