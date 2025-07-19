import { API } from "../utils/axiosConfigs";
import { endpoints, getAccessToken, setCookieToken } from "../utils/helper";

export async function refreshToken() {
  const token = getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await API.post(
    endpoints.refresh,
    JSON.stringify({ token }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) throw new Error("Refresh token failed");

  const newToken = res.data?.result;

  if (newToken) {
    setCookieToken(newToken); // Lưu token mới vào cookie
    return newToken;
  }

  throw new Error("No new token received");
}
