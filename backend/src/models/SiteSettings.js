export const SITE_SETTINGS_TABLE = 'site_settings';
export const SITE_SETTINGS_ID = 1;

export const defaultSiteSettings = {
  id: SITE_SETTINGS_ID,
  site_name: 'MSole',
  auth_required: false,
  contact_email: 'daniyal.amjad7989@gmail.com',
  calendly_url: 'https://calendly.com/daniyal-amjad7989/30min',
  social_links: {
    linkedin: 'https://www.linkedin.com/in/muhammad-daniyal-amjad/',
    upwork: 'https://www.upwork.com/freelancers/~013899322c02a33e0d',
    whatsapp: 'https://wa.me/923356561702'
  },
  maintenance_mode: false
};

export const mapSiteSettingsRow = (row) => ({
  siteName: row.site_name,
  authRequired: row.auth_required,
  contactEmail: row.contact_email,
  calendlyUrl: row.calendly_url,
  socialLinks: row.social_links || {},
  maintenanceMode: row.maintenance_mode,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const toSiteSettingsUpdate = (updates, current = {}) => ({
  ...(updates.siteName !== undefined ? { site_name: updates.siteName } : {}),
  ...(updates.authRequired !== undefined ? { auth_required: updates.authRequired } : {}),
  ...(updates.contactEmail !== undefined ? { contact_email: updates.contactEmail } : {}),
  ...(updates.calendlyUrl !== undefined ? { calendly_url: updates.calendlyUrl } : {}),
  ...(updates.socialLinks !== undefined
    ? { social_links: { ...(current.social_links || {}), ...updates.socialLinks } }
    : {}),
  ...(updates.maintenanceMode !== undefined ? { maintenance_mode: updates.maintenanceMode } : {})
});
