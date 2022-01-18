export function addLoginCheck() {
  return {
    type: "LOGIN_CHECK",
  };
}

export function addLogoutCheck() {
  return {
    type: "LOGOUT_CHECK",
  };
}

export function addUserDetails(userdata) {
  return {
    type: "ADD_USER_DATA",
    payload: userdata,
  };
}

