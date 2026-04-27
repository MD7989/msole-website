export const CONTACT_MESSAGE_TABLE = 'contact_messages';

export const mapContactMessageRow = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  company: row.company || '',
  service: row.service || '',
  message: row.message,
  status: row.status,
  ipAddress: row.ip_address || '',
  userAgent: row.user_agent || '',
  emailDelivery: {
    attempted: Boolean(row.email_delivery_attempted),
    sent: Boolean(row.email_delivery_sent),
    error: row.email_delivery_error || ''
  },
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const toContactMessageInsert = (payload, metadata = {}) => ({
  name: payload.name,
  email: payload.email,
  company: payload.company || '',
  service: payload.service || '',
  message: payload.message,
  ip_address: metadata.ipAddress || '',
  user_agent: metadata.userAgent || ''
});

export const toEmailDeliveryUpdate = (delivery) => ({
  email_delivery_attempted: Boolean(delivery.attempted),
  email_delivery_sent: Boolean(delivery.sent),
  email_delivery_error: delivery.error || ''
});
