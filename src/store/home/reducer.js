import { CHANGE_LIST } from "./constants";

const defaultState = {
  name: "tucchun",
  list: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LIST:
      debugger
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
};
