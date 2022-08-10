import axios from "axios";

    export function getAds () {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/ads");
     
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

export function filterAllAds(payload) {
 
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/filter?name=${payload?.name}&specialty=${payload?.specialty}&country=${payload?.country}&province=${payload?.province}&city=${payload?.city}`)
    return dispatch({ type: 'FILTER_ALL_ADS', payload: json.data})
  }


}

export function orderByPrice(payload) {
  return{
      type:'ORDER_PRICE',
      payload
  }
}

export function orderByRanking(payload) {
  return{
      type:'FILTER_RANKING',
      payload
  }
}

export function postAdd(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`http://localhost:3001/ad`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}
export function getName(name) {
  return async (dispatch) =>{
      
      try {
          var json= await axios.get(`http://localhost:3001/ads?name=${name}`);
      return dispatch({type:'GET_NAME', payload: json.data})
      } catch (error) {
          alert('no tenemos un profesional con ese nombre')
      }
  }
};

export function addFavorite(payload) {
    return async function (dispatch) {
        console.log(payload)
      try {
        var json = await axios.put(`http://localhost:3001/addFavorites`, payload);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function removeFavorite(payload) {
    return async function (dispatch) {
      try {
        var json = await axios.put(`http://localhost:3001/removeFavorites`, payload);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
  }
































  export function putEditInfoAdd(payload, idUser) {
    return async function (dispatch) {
      console.log(payload , idUser)
      try {
        await axios.put(`http://localhost:3001/Ad/${idUser}`, payload);
      } catch (error) {
        console.log(error);
      }
    };
  }


  export function putEditInfoUser(payload , idUser) {
    return async function (dispatch) {
      console.log(payload , idUser)
      try {
         await axios.put(`http://localhost:3001/user/${idUser}`, payload);
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  
  export function putEditInfoProfessional(payload , idUser) {
    return async function (dispatch) {
      console.log(payload , idUser)
      console.log("llegue aca")
      try {
         await axios.put(`http://localhost:3001/professional/${idUser}`, payload);
      } catch (error) {
        console.log(error);
      }
    };
  }
