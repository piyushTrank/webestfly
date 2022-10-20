import axios from "axios";
import { miscTypes } from "./misc.type";
import { api_url } from "../../utils/apiInfo";

export const getContactNum = (data) => async (dispatch, state) => {
  try {
    const res = await axios.get(`${api_url}/app/get-contact-num`);

    console.log("Get contact num", res.data);

    if (res.data.status === "success") {
      dispatch({
        type: miscTypes.FETCH_CONTACT_NUM,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log("Get contact num error:", error);
  }
};
