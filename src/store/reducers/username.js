function username(state = "", action) {
  switch (action.type) {
    case "SET":
      return action.text;
    default:
      return state;
  }
}

export default username;
