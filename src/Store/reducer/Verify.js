const initialState = {
  collection: false,
};

export function VerifyReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_CHECK":
      return {
        collection: true,
      };
    case "LOGOUT_CHECK":
      return {
        collection: false,
      };
    default:
      return state;
  }
}
