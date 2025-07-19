import { API, AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints, getAccessToken } from "../utils/helper";



export async function enable2fa() {
  const res = await AUTH_REQUEST.post(endpoints.enable2fa);
  if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;
  console.log("Token: ", data)

  return data;
}

export async function verifyCode(code) {
  const res = await AUTH_REQUEST.post(endpoints.verifyCode, {
    code: code,
  });
  if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;
  console.log("Token: ", data)

  return data;
}