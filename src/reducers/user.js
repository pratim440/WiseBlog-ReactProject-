export default (user = [], action) => {
  switch (action.type) {
    case "SIGN_UP": {
      return [action.payload];
    }
    case "SIGN_IN": {
      return [action.payload];
    }
    case "LOG_OUT": {
      return [];
    }
    default:
      return user;
  }
};
