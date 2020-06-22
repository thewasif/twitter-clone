function reducer(action, state) {
  switch (action.type) {
    case "CHANGE_STYLES":
      return action.styles;

    default:
      return state;
  }
}

export default reducer;
