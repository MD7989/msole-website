import { createSupabaseAnonClient, supabaseAdmin } from '../config/supabase.js';
import { countProfiles, createUserProfile, getUserForAuthUser } from '../services/userService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const isAlreadyRegisteredError = (error) => {
  return /already|exists|registered/i.test(error?.message || '');
};

const toAuthResponse = async ({ user: authUser, session }) => {
  if (!authUser || !session?.access_token) {
    throw new ApiError(401, 'Authentication failed');
  }

  const user = await getUserForAuthUser(authUser);

  return {
    user,
    token: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at
  };
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validated.body;
  const normalizedEmail = email.toLowerCase();
  const role = (await countProfiles()) === 0 ? 'admin' : 'user';
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
    user_metadata: { name }
  });

  if (createError) {
    if (isAlreadyRegisteredError(createError)) {
      throw new ApiError(409, 'An account with this email already exists');
    }

    throw new ApiError(400, createError.message);
  }

  if (!created.user) {
    throw new ApiError(400, 'Unable to create Supabase user');
  }

  try {
    await createUserProfile({
      id: created.user.id,
      name,
      email: normalizedEmail,
      role
    });
  } catch (error) {
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(created.user.id);

    if (deleteError) {
      console.error('Failed to roll back Supabase auth user after profile creation error:', deleteError);
    }

    throw error;
  }

  const { data: signInData, error: signInError } = await createSupabaseAnonClient()
    .auth
    .signInWithPassword({ email: normalizedEmail, password });

  if (signInError) {
    throw new ApiError(401, signInError.message);
  }

  res.status(201).json(await toAuthResponse(signInData));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const { data, error } = await createSupabaseAnonClient()
    .auth
    .signInWithPassword({ email: email.toLowerCase(), password });

  if (error) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.json(await toAuthResponse(data));
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.validated.body;
  const { data, error } = await createSupabaseAnonClient()
    .auth
    .refreshSession({ refresh_token: refreshToken });

  if (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  res.json(await toAuthResponse(data));
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    user: req.user
  });
});

export const logout = asyncHandler(async (_req, res) => {
  res.json({
    message: 'Logged out'
  });
});
