import { supabaseAdmin } from '../config/supabase.js';
import {
  CONTACT_MESSAGE_TABLE,
  mapContactMessageRow,
  toContactMessageInsert,
  toEmailDeliveryUpdate
} from '../models/ContactMessage.js';
import { sendContactNotification } from '../services/emailService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const contactPayload = req.validated.body;
  const { data: createdMessage, error: createError } = await supabaseAdmin
    .from(CONTACT_MESSAGE_TABLE)
    .insert(toContactMessageInsert(contactPayload, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') || ''
    }))
    .select('*')
    .single();

  if (createError) {
    throw new ApiError(500, `Failed to save contact message: ${createError.message}`);
  }

  const message = mapContactMessageRow(createdMessage);
  const delivery = await sendContactNotification(message);
  const { error: updateError } = await supabaseAdmin
    .from(CONTACT_MESSAGE_TABLE)
    .update(toEmailDeliveryUpdate(delivery))
    .eq('id', message.id);

  if (updateError) {
    console.error('Failed to update contact email delivery status:', updateError);
  }

  res.status(201).json({
    message: 'Message received',
    id: message.id,
    emailSent: delivery.sent
  });
});

export const listContactMessages = asyncHandler(async (_req, res) => {
  const { data, error } = await supabaseAdmin
    .from(CONTACT_MESSAGE_TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    throw new ApiError(500, `Failed to list contact messages: ${error.message}`);
  }

  res.json({ messages: data.map(mapContactMessageRow) });
});
