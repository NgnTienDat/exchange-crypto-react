import { API, AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints, getAccessToken, getDeviceId } from "../utils/helper";


export async function loginOauth(code) {
  const res = await API.post(`${endpoints.getTokenOutBound}?code=${code}`)
  return res.data?.result || null
}


export async function enable2fa() {
  const res = await AUTH_REQUEST.post(endpoints.enable2fa);
  if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;
  console.log("Token: ", data)

  return data;
}

export async function verifyCode({userId, code, deviceId}) {
  const res = await API.post(endpoints.verifyCode, {
    userId,
    code,
    deviceId
  });
  // if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;
  console.log("Token: ", data)

  return data;
}

export async function sendOtp(email) {
  const res = await API.post(endpoints.sendOtp, {email});
  if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;

  return data;
}

export async function verifyOtp({email, code}) {
  const res = await API.post(endpoints.verifyOtp, {
    code: code,
    email: email
  });
 
  const data = res.data;


  return data;
}