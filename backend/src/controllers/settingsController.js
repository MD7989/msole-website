import { supabaseAdmin } from '../config/supabase.js';
import {
  SITE_SETTINGS_ID,
  SITE_SETTINGS_TABLE,
  defaultSiteSettings,
  mapSiteSettingsRow,
  toSiteSettingsUpdate
} from '../models/SiteSettings.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getOrCreateSettings = async () => {
  const { data: settings, error } = await supabaseAdmin
    .from(SITE_SETTINGS_TABLE)
    .select('*')
    .eq('id', SITE_SETTINGS_ID)
    .maybeSingle();

  if (error) {
    throw new ApiError(500, `Failed to load site settings: ${error.message}`);
  }

  if (settings) {
    return settings;
  }

  const { data: createdSettings, error: createError } = await supabaseAdmin
    .from(SITE_SETTINGS_TABLE)
    .insert(defaultSiteSettings)
    .select('*')
    .single();

  if (createError) {
    throw new ApiError(500, `Failed to create site settings: ${createError.message}`);
  }

  return createdSettings;
};

export const getPublicSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();

  res.json(mapSiteSettingsRow(settings));
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  const updates = req.validated.body;
  const updatePayload = toSiteSettingsUpdate(updates, settings);

  if (Object.keys(updatePayload).length === 0) {
    return res.json({ settings: mapSiteSettingsRow(settings) });
  }

  const { data: updatedSettings, error } = await supabaseAdmin
    .from(SITE_SETTINGS_TABLE)
    .update(updatePayload)
    .eq('id', SITE_SETTINGS_ID)
    .select('*')
    .single();

  if (error) {
    throw new ApiError(500, `Failed to update site settings: ${error.message}`);
  }

  return res.json({ settings: mapSiteSettingsRow(updatedSettings) });
});
