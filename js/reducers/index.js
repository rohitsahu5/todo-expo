const initialState = {
  all: []
};
function rootReducer(state = initialState, action) {
  if (action.type == "getTasks") {
    var data = action.payload;
    return { ...state, ...{ all: data } };
  }
}
export default rootReducer;
