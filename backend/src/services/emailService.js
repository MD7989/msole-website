import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const EMAIL_TIMEOUT_MS = 8000;

const createContactEmail = (message) => ({
  to: env.smtp.contactTo,
  replyTo: message.email,
  subject: `New MSole contact request from ${message.name}`,
  text: [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Company: ${message.company || 'N/A'}`,
    `Service: ${message.service || 'Not specified'}`,
    '',
    message.message
  ].join('\n')
});

const hasResendConfig = () => {
  return Boolean(env.resend.apiKey && env.resend.from && env.smtp.contactTo);
};

const hasSmtpConfig = () => {
  return Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);
};

const hasBrevoConfig = () => {
  return Boolean(env.brevo.apiKey && env.brevo.fromEmail && env.smtp.contactTo);
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    connectionTimeout: EMAIL_TIMEOUT_MS,
    greetingTimeout: EMAIL_TIMEOUT_MS,
    socketTimeout: EMAIL_TIMEOUT_MS,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass
    }
  });
};

const sendWithResend = async (message) => {
  if (!hasResendConfig()) {
    return {
      attempted: false,
      sent: false,
      error: 'Resend is not configured'
    };
  }

  const email = createContactEmail(message);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);

  let response;

  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${env.resend.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.resend.from,
        to: [email.to],
        reply_to: [email.replyTo],
        subject: email.subject,
        text: email.text
      })
    });
  } catch (error) {
    return {
      attempted: true,
      sent: false,
      error: error.name === 'AbortError' ? 'Resend request timed out' : error.message
    };
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      attempted: true,
      sent: false,
      error: data?.message || data?.error || `Resend request failed with ${response.status}`
    };
  }

  return {
    attempted: true,
    sent: true,
    error: ''
  };
};

const sendWithSmtp = async (message) => {
  if (!hasSmtpConfig()) {
    return {
      attempted: false,
      sent: false,
      error: 'SMTP is not configured'
    };
  }

  const transporter = createTransporter();
  const email = createContactEmail(message);

  try {
    await transporter.sendMail({
      from: env.smtp.from,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text
    });

    return {
      attempted: true,
      sent: true,
      error: ''
    };
  } catch (error) {
    return {
      attempted: true,
      sent: false,
      error: error.message
    };
  }
};

const sendWithBrevo = async (message) => {
  if (!hasBrevoConfig()) {
    return {
      attempted: false,
      sent: false,
      error: 'Brevo is not configured'
    };
  }

  const email = createContactEmail(message);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);

  let response;

  try {
    response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'api-key': env.brevo.apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: env.brevo.fromName,
          email: env.brevo.fromEmail
        },
        to: [
          {
            email: email.to
          }
        ],
        replyTo: {
          email: email.replyTo,
          name: message.name
        },
        subject: email.subject,
        textContent: email.text
      })
    });
  } catch (error) {
    return {
      attempted: true,
      sent: false,
      error: error.name === 'AbortError' ? 'Brevo request timed out' : error.message
    };
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      attempted: true,
      sent: false,
      error: data?.message || data?.error || `Brevo request failed with ${response.status}`
    };
  }

  return {
    attempted: true,
    sent: true,
    error: ''
  };
};

export const sendContactNotification = async (message) => {
  if (env.emailProvider === 'brevo') {
    return sendWithBrevo(message);
  }

  if (env.emailProvider === 'resend') {
    return sendWithResend(message);
  }

  if (env.emailProvider !== 'smtp') {
    return {
      attempted: false,
      sent: false,
      error: `Unsupported email provider: ${env.emailProvider}`
    };
  }

  return sendWithSmtp(message);
};
