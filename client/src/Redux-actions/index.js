import axios from "axios";

    export function getAds () {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/ad");
     
        return dispatch({type: 'GET_ADS', payload: json.data});
    }
    
};


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
  }
};

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  }
};

export function getUsers() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/users");
    return dispatch({ type: "GET_USERS", payload: json.data });
  }
 };
 
 export function getUsersById(id) {
    return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/user/${id}`);
      return dispatch({ type: "GET_USER_DETAIL", payload: json.data });
    };
  };

export function getAdById (id) {

    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/ad/${id}`);
        return dispatch({type: 'GET_AD_DETAILS', payload: json.data});

    }

};
export function OrederAdByPrice(payload) {
  return{
      type:'ORDER_PRICE',
      payload
  }
}
export function filterSpecialty(payload) {
  return{
      type:'FILTER_SPECIALTY',
      payload
  }
}
export function filterCountry(payload) {
  return{
      type:'FILTER_COUNTRY',
      payload
  }
}
export function filterProvince(payload) {
  return{
      type:'FILTER_PROVINCE',
      payload
  }
}
export function filterCity(payload) {
  return{
      type:'FILTER_CITY',
      payload
  }
}
export function filterTypeService(payload) {
  return{
      type:'FILTER_TYPE_SERVICE',
      payload
  }
}
export function filterRanking(payload) {
  return{
      type:'FILTER_RANKING',
      payload
  }
}