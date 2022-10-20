import { miscTypes } from "./misc.type";

const INITIAL_STATE = {
  contact: null,
};

const MiscReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case miscTypes.FETCH_CONTACT_NUM:
      return {
        ...state,
        contact: action.payload,
      };

    default:
      return state;
  }
};

export default MiscReducer;
