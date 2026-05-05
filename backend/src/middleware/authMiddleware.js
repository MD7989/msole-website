import { createSupabaseAnonClient } from '../config/supabase.js';
import { getUserForAuthUser } from '../services/userService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getAuthCookies } from '../utils/authCookies.js';

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');
  const cookieToken = getAuthCookies(req).accessToken;
  const accessToken = scheme === 'Bearer' && token ? token : cookieToken;

  if (!accessToken) {
    throw new ApiError(401, 'Authentication required');
  }

  const { data, error } = await createSupabaseAnonClient().auth.getUser(accessToken);

  if (error || !data.user) {
    throw new ApiError(401, 'Invalid or expired authentication');
  }

  req.user = await getUserForAuthUser(data.user);
  req.supabaseAccessToken = accessToken;
  next();
});

export const requireAdmin = (req, _res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }

  return next();
};
