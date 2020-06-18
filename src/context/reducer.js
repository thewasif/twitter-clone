function reducer(action, state) {
  switch (action.type) {
    case "CHANGE":
      return action.styles;
    default:
      return state;
  }
}

export default reducer;
