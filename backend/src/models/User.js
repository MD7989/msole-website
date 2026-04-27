export const PROFILE_TABLE = 'profiles';

export const mapUserProfile = (profile, authUser = {}) => ({
  id: profile?.id || authUser?.id,
  name: profile?.name || authUser?.user_metadata?.name || authUser?.email || '',
  email: profile?.email || authUser?.email || '',
  role: profile?.role || 'user',
  isActive: profile?.is_active ?? true,
  createdAt: profile?.created_at || authUser?.created_at || null,
  updatedAt: profile?.updated_at || authUser?.updated_at || null
});

export const toProfileInsert = ({ id, name, email, role = 'user' }) => ({
  id,
  name,
  email,
  role,
  is_active: true
});
