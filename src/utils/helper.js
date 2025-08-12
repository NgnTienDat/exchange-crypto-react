import Cookies from "universal-cookie";

export const endpoints = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  info: "/api/users/my-info",
  refresh: "/auth/refresh",
  enable2fa: "/auth/2fa/setup",
  verifyCode: "/auth/2fa/verify-code",
  myAssets: "/api/assets/my",
  productDetail: (productId) => `/api/trade/${productId}`,
}

export const PRODUCT_IDS = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'DOTUSDT', 'BNBUSDT', 'SOLUSDT']

const cookies = new Cookies();
const AUTH_TOKEN_KEY = 'auth_token';

export const setCookieToken = (token) => {
  cookies.set(AUTH_TOKEN_KEY, token, {
    path: '/',
    maxAge: 36000,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getAccessToken = () => {
  return cookies.get(AUTH_TOKEN_KEY) || null;
};

// export const getRefreshToken = () => {
//   const token = cookies.get(AUTH_TOKEN_KEY);
//   return token?.refreshToken || null;
// };

export const AuthenticationHeader = () => {
  const accessToken = getAccessToken();
  if (!accessToken) return {};
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const removeCookieToken = () => {
  cookies.remove(AUTH_TOKEN_KEY, { path: '/' });
};
