import { supabaseAdmin } from '../config/supabase.js';
import { PROFILE_TABLE, mapUserProfile } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const createUserProfile = async ({ id, name, email }) => {
  const { data, error } = await supabaseAdmin
    .rpc('create_profile_with_initial_admin', {
      profile_id: id,
      profile_name: name,
      profile_email: email
    });

  if (error) {
    throw new ApiError(500, `Failed to create user profile: ${error.message}`);
  }

  return Array.isArray(data) ? data[0] : data;
};

export const getUserForAuthUser = async (authUser) => {
  const { data: profile, error } = await supabaseAdmin
    .from(PROFILE_TABLE)
    .select('*')
    .eq('id', authUser.id)
    .maybeSingle();

  if (error) {
    throw new ApiError(500, `Failed to load user profile: ${error.message}`);
  }

  if (!profile) {
    throw new ApiError(403, 'User profile is not registered');
  }

  const user = mapUserProfile(profile, authUser);

  if (!user.isActive) {
    throw new ApiError(403, 'User account is inactive');
  }

  return user;
};
