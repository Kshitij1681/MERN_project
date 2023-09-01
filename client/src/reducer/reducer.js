const initialState = null;
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER":
      return payload;
    default:
      return state;
  }
};

export { reducer, initialState };
