import { supabaseAdmin } from '../config/supabase.js';
import { PROFILE_TABLE, mapUserProfile, toProfileInsert } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const countProfiles = async () => {
  const { count, error } = await supabaseAdmin
    .from(PROFILE_TABLE)
    .select('id', { count: 'exact', head: true });

  if (error) {
    throw new ApiError(500, `Failed to count user profiles: ${error.message}`);
  }

  return count || 0;
};

export const createUserProfile = async ({ id, name, email, role }) => {
  const { data, error } = await supabaseAdmin
    .from(PROFILE_TABLE)
    .insert(toProfileInsert({ id, name, email, role }))
    .select('*')
    .single();

  if (error) {
    throw new ApiError(500, `Failed to create user profile: ${error.message}`);
  }

  return data;
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
