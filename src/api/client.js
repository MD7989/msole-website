const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '/api';
const ACCESS_TOKEN_KEY = 'msole_auth_token';
const REFRESH_TOKEN_KEY = 'msole_refresh_token';

export const legacyAuthStorage = {
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/json')
    ? response.json()
    : response.text();
};

const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const data = await parseResponseBody(response);

  if (!response.ok) {
    legacyAuthStorage.clear();
    return null;
  }

  return true;
};

export const apiClient = async (path, options = {}, canRefresh = true) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers
  });

  const data = await parseResponseBody(response);

  if (response.status === 401 && canRefresh && path !== '/auth/refresh' && path !== '/auth/login' && path !== '/auth/register') {
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      return apiClient(path, options, false);
    }
  }

  if (!response.ok) {
    const message = typeof data === 'object' && data?.message
      ? data.message
      : 'API request failed';
    throw new Error(message);
  }

  return data;
};
