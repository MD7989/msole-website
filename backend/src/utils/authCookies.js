import { env } from '../config/env.js';

const ACCESS_TOKEN_COOKIE = 'msole_access_token';
const REFRESH_TOKEN_COOKIE = 'msole_refresh_token';

const cookieOptions = {
  httpOnly: true,
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  secure: env.nodeEnv === 'production',
  path: '/'
};

export const parseCookies = (cookieHeader = '') => {
  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separatorIndex = cookie.indexOf('=');

      if (separatorIndex === -1) {
        return cookies;
      }

      const key = cookie.slice(0, separatorIndex);
      const value = cookie.slice(separatorIndex + 1);
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
};

export const getAuthCookies = (req) => {
  const cookies = parseCookies(req.headers.cookie || '');

  return {
    accessToken: cookies[ACCESS_TOKEN_COOKIE] || '',
    refreshToken: cookies[REFRESH_TOKEN_COOKIE] || ''
  };
};

export const setAuthCookies = (res, { token, refreshToken, expiresAt }) => {
  if (token) {
    const maxAge = expiresAt
      ? Math.max((expiresAt * 1000) - Date.now(), 60 * 1000)
      : 60 * 60 * 1000;

    res.cookie(ACCESS_TOKEN_COOKIE, token, {
      ...cookieOptions,
      maxAge
    });
  }

  if (refreshToken) {
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
  }
};

export const clearAuthCookies = (res) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
  res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);
};
