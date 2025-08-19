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
  postOrder: "/api/orders/",
  allOrders: "/api/orders/history",
  productDetail: (productId) => `/api/trade/${productId}`,
  unsubscribeProduct: (productId) => `/api/trade/unsubscribe/${productId}`,
  myOrders: (productId) => `/api/orders/${productId}`,
  openOrders: (productId) => `/api/orders/open/${productId}`,
  orderHistory: (productId) => `/api/orders/history/${productId}`,
}

export const PRODUCT_IDS = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'DOTUSDT', 'BNBUSDT', 'SOLUSDT']

export const assetConfig = {
  'BTC': {
    name: 'Bitcoin',
    icon: '₿',
    iconBg: 'bg-amber-400'
  },
  'USDT': {
    name: 'Tether USD',
    icon: '$',
    iconBg: 'bg-blue-500'
  },
  'USDC': {
    name: 'USDC',
    icon: '$',
    iconBg: 'bg-blue-500'
  },
  'ETH': {
    name: 'Ethereum',
    icon: 'Ξ',
    iconBg: 'bg-gray-600'
  },
  'BNB': {
    name: 'Binance Coin',
    icon: 'B',
    iconBg: 'bg-yellow-500'
  }
};

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


export const formatNumber = (num) =>
  num?.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });


export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month}, ${hours}:${minutes}`;
};