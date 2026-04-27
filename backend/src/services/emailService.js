import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

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

const createTransporter = () => {
  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
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
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
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

export const sendContactNotification = async (message) => {
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
