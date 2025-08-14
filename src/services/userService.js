import { API, AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints, getAccessToken } from "../utils/helper";



export async function loginApi({ email, password }) {
  const res = await API.post(endpoints.login, {
    email: email,
    password: password,
  });

  if (res.status !== 200) throw new Error(res.response.data);
  const data = res.data.result;
  // console.log("Token: ", data)

  return data;
}


export async function logoutAPI() {
  const res = await AUTH_REQUEST.post(endpoints.logout, {
    token: getAccessToken(),
  }, {
    headers: {
      "Content-Type": "application/json", 
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(res.data?.message || "Logout failed");
  }
}



export async function getCurrentUser() {
  const res = await AUTH_REQUEST.get(endpoints.info);
  // console.log("Current: ", res.data)


  if (res.status != 200) throw new Error("Error currentUser");

  const data = res.data;
  // console.log("Current user: ", data)

  return data?.result || null
}