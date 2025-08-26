import { API, AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints, getAccessToken } from "../utils/helper";




export async function loginApi({ email, password, deviceId, userAgent }) {

  const res = await API.post(endpoints.login, {
    email,
    password,
    deviceId,
    userAgent,
  });

  if (res.status !== 200)
    throw new Error(res.response.data);
  console.log("data: ", res.data.result)
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


export async function signUpApi({ email, password }) {
  const res = await API.post(endpoints.createUser, {
    email: email,
    password: password,
  });

  // if (res.status !== 201) throw new Error(res.response.data);
  // const data = res.data.result;
  console.log("data signup: ", res)

  return res.data.result;
}



export async function getCurrentUser() {
  const res = await AUTH_REQUEST.get(endpoints.info);
  // console.log("Current: ", res.data)


  if (res.status != 200) throw new Error("Error currentUser");

  const data = res.data;
  // console.log("Current user: ", data)

  return data?.result || null
}



export async function getAllUsers(page = 0, size = 10) {
  const res = await AUTH_REQUEST.get(`${endpoints.allUsers}?page=${page}&size=${size}`);

  if (res.status !== 200) throw new Error("Error fetching users");

  const data = res.data;
  return data?.result || null; 
}


export async function deleteUser(userId) {
  const res = await AUTH_REQUEST.delete(endpoints.user(userId));
  // console.log("Current: ", res.data)


  if (res.status != 200) throw new Error("Error delete user");

  const data = res.data;
  // console.log("Current user: ", data)

  return data?.result || null
}


export async function lockUser(updateData) {
  const res = await AUTH_REQUEST.patch(endpoints.userLocked, 
    updateData
  );

  if (res.status != 200) throw new Error("Error lock user");

  const data = res.data;

  return data?.result || null
}

// export async function unlockUser(userId) {
//   const res = await AUTH_REQUEST.patch(endpoints.userUnlocked(userId));

//   if (res.status != 200) throw new Error("Error unlock user");

//   const data = res.data;

//   return data?.result || null
// }