export const initialState = {
    user: null,  // Initial state for normal users
    sagUser: null // Initial state for SAG users
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_NORMAL':
        return {
          ...state,
          user: action.payload.user,
          sagUser: null  // Ensure SAG user state is reset
        };
      case 'LOGIN_SAG':
        return {
          ...state,
          sagUser: action.payload.user,
          user: null // Ensure normal user state is reset
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          sagUser: null
        };
      default:
        return state;
    }
  };
  