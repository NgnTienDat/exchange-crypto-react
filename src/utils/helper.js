import Cookies from "universal-cookie";

export const endpoints = {
  login: '/auth/login',
  logout: '/auth/logout',
  sendOtp: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  info: "/api/users/my-info",
  createUser: "/api/users/",
  allUsers: "/api/users/",
  userLocked: "/api/users/lock",
  refresh: "/auth/refresh",
  enable2fa: "/auth/2fa/setup",
  verifyCode: "/auth/2fa/verify-code",
  myAssets: "/api/assets/my",
  postOrder: "/api/orders/",
  allMyOrders: "/api/orders/",
  allOrders: "/api/orders/all",
  userAssets: (userId) => `/api/assets/${userId}`,
  productDetail: (productId) => `/api/trade/${productId}`,
  unsubscribeProduct: (productId) => `/api/trade/unsubscribe/${productId}`,
  myOrders: (productId) => `/api/orders/${productId}`,
  openOrders: (productId) => `/api/orders/open/${productId}`,
  orderHistory: (productId) => `/api/orders/history/${productId}`,
  userOrders: (userId) => `/api/orders/user/${userId}`,
  orderStats: (userId) => `/api/orders/stats/${userId}`,
  user: (userId) => `/api/users/${userId}`,
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
const DEVICE_ID = 'device_id';

export const setCookieToken = (token) => {
  console.log("setToken", token)
  cookies.set(AUTH_TOKEN_KEY, token, {
    path: '/',
    maxAge: 36000,
    secure: true,
    sameSite: 'Strict',
  });
};

export const setDeviceId = (uuid) => {
  cookies.set(DEVICE_ID, uuid, {
    path: '/',
    maxAge: 36000,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getAccessToken = () => {
  return cookies.get(AUTH_TOKEN_KEY) || null;
};

export const getDeviceId = () => {
  return cookies.get(DEVICE_ID) || null;
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


// Lấy fingerprint
function getFingerprint() {
  const ua = navigator.userAgent;
  const lang = navigator.language;
  const screenRes = `${screen.width}x${screen.height}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${ua}###${lang}###${screenRes}###${tz}`;
}

// Hash SHA-256 và convert sang UUID
export async function fingerprintToUUID() {
  const data = new TextEncoder().encode(getFingerprint());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Lấy 16 byte đầu tiên để tạo UUID v4 format
  const hex = hashArray.slice(0, 16).map(b => b.toString(16).padStart(2, "0")).join("");
  return hex.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/, "$1-$2-$3-$4-$5");
}


