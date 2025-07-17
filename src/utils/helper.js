import Cookies from "universal-cookie";

export const endpoints = {
  register: '/auth/register',
  login: '/auth/login',
 
}

const cookies = new Cookies();
const AUTH_TOKEN_KEY = 'auth_token';

export const setCookieToken = (token) => {
  cookies.set(AUTH_TOKEN_KEY, token, {
    path: '/',
    maxAge: 3600,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getAccessToken = () => {
  const token = cookies.get(AUTH_TOKEN_KEY);
  return token?.accessToken || null;
};

export const getRefreshToken = () => {
  const token = cookies.get(AUTH_TOKEN_KEY);
  return token?.refreshToken || null;
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


// export const getAccessToken = () => {
//   const token = window.localStorage.getItem("auth_token");
//   if (token == null) return null;
//   return JSON.parse(token).accessToken;
// };

// export const getRefreshToken = () => {
//   const token = window.localStorage.getItem("auth_token");
//   if (token == null) return null;
//   return JSON.parse(token).getRefreshToken;
// };

// export const AuthenticationHeader = function () {
//   return {
//     Authorization: `Bearer ${getAccessToken()}`,
//   };
// };

// export const setLocalStorageToken = (token) => {
//   window.localStorage.setItem("auth_token", JSON.stringify(token));
// };

// export const removeLocalStorageToken = () => {
//   window.localStorage.removeItem("auth_token");
// };
