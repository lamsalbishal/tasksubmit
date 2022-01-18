const initialState = {
  userCollection: {},
};

export function userReducers(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER_DATA":
      return {
        userCollection: action.payload,
      };
    default:
      return state;
  }
}
