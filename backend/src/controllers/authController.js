import { createSupabaseAnonClient, supabaseAdmin } from '../config/supabase.js';
import { createUserProfile, getUserForAuthUser } from '../services/userService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { clearAuthCookies, getAuthCookies, setAuthCookies } from '../utils/authCookies.js';

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
    expiresAt: session.expires_at
  };
};

const sendAuthResponse = async (res, authData, statusCode = 200) => {
  setAuthCookies(res, {
    token: authData.session?.access_token,
    refreshToken: authData.session?.refresh_token,
    expiresAt: authData.session?.expires_at
  });

  return res.status(statusCode).json(await toAuthResponse(authData));
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validated.body;
  const normalizedEmail = email.toLowerCase();
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
      email: normalizedEmail
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

  return sendAuthResponse(res, signInData, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const { data, error } = await createSupabaseAnonClient()
    .auth
    .signInWithPassword({ email: email.toLowerCase(), password });

  if (error) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return sendAuthResponse(res, data);
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken: cookieRefreshToken } = getAuthCookies(req);
  const refreshToken = req.validated.body.refreshToken || cookieRefreshToken;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  const { data, error } = await createSupabaseAnonClient()
    .auth
    .refreshSession({ refresh_token: refreshToken });

  if (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  return sendAuthResponse(res, data);
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    user: req.user
  });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.supabaseAccessToken) {
    const { error } = await supabaseAdmin.auth.admin.signOut(req.supabaseAccessToken);

    if (error) {
      console.error('Failed to revoke Supabase session during logout:', error);
    }
  }

  clearAuthCookies(res);

  res.json({
    message: 'Logged out'
  });
});
