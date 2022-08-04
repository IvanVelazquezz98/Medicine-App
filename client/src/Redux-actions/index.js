import axios from "axios";

export function getAds() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/Ad");

    return dispatch({ type: "GET_ADS", payload: json.data });
  };
}

export function getProfessionalById(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/professionals/${id}`);
    return dispatch({ type: "GET_PROFESSIONAL_DETAILS", payload: json.data });
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`http://localhost:3001/users`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProfessional(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(
        `http://localhost:3001/professionals`,
        payload
      );
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  };
}

export function getUsers() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/users");

    return dispatch({ type: "GET_USERS", payload: json.data });
  };
}
export function getUsersById(id) {
    return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/user/${id}`);
      return dispatch({ type: "GET_PROFESSIONAL_DETAILS", payload: json.data });
    };
  }