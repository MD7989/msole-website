const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || '/api';
const ACCESS_TOKEN_KEY = 'msole_auth_token';
const REFRESH_TOKEN_KEY = 'msole_refresh_token';

export const tokenStorage = {
  get() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefresh() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  set(token, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },
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
  const refreshToken = tokenStorage.getRefresh();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });
  const data = await parseResponseBody(response);

  if (!response.ok) {
    tokenStorage.clear();
    return null;
  }

  tokenStorage.set(data.token, data.refreshToken);
  return data.token;
};

export const apiClient = async (path, options = {}, canRefresh = true) => {
  const token = tokenStorage.get();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await parseResponseBody(response);

  if (response.status === 401 && canRefresh && path !== '/auth/refresh') {
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
