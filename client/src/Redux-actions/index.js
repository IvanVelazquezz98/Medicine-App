import axios from "axios";

//get all ads
    export function getAds () {
    return async function (dispatch){
        var json = await axios.get("https://medicineapp-api.herokuapp.com/ads");
     
        return dispatch({type: 'GET_ADS', payload: json.data});
    }
    
};

// get professional by ID
export function getProfessionalById(id) {
  return async function (dispatch) {
    var json = await axios.get(`https://medicineapp-api.herokuapp.com/professionals/${id}`);
    return dispatch({ type: "GET_PROFESSIONAL_DETAILS", payload: json.data });
  };
}

// Create a  USER
export function postUser(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`https://medicineapp-api.herokuapp.com/users`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}


//Create a Professional
export function postProfessional(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(
        `https://medicineapp-api.herokuapp.com/professionals`,
        payload
      );
      return json;
    } catch (error) {
      console.log(error);
    }
  }
};

//clear Detail object
export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  }
};


//Get all Users
export function getUsers() {
  return async function (dispatch) {
    var json = await axios.get("https://medicineapp-api.herokuapp.com/users");
    return dispatch({ type: "GET_USERS", payload: json.data });
  }
 };
 

 //get user by id
 export function getUsersById(id) {
    return async function (dispatch) {
      var json = await axios.get(`https://medicineapp-api.herokuapp.com/user/${id}`);
      return dispatch({ type: "GET_USER_DETAIL", payload: json.data });
    };
  };


  //get add by ID
export function getAdById (id) {

    return async function (dispatch){
        var json = await axios.get(`https://medicineapp-api.herokuapp.com/ad/${id}`);
        return dispatch({type: 'GET_AD_DETAILS', payload: json.data});

    }

};

// filters
export function filterAllAds(payload) {
 
  return async function (dispatch) {
    var json = await axios.get(`https://medicineapp-api.herokuapp.com/filter?name=${payload?.name}&specialty=${payload?.specialty}&country=${payload?.country}&province=${payload?.province}&city=${payload?.city}`)
    return dispatch({ type: 'FILTER_ALL_ADS', payload: json.data})
  }


}


//order by price
export function orderByPrice(payload) {
  return{
      type:'ORDER_PRICE',
      payload
  }
}



//order by ranking
export function orderByRanking(payload) {
  return{
      type:'FILTER_RANKING',
      payload
  }
}


//Create Ad 
export function postAdd(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`https://medicineapp-api.herokuapp.com/ad`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

//ger professional by name
export function getName(name) {
  return async (dispatch) =>{
      
      try {
          var json= await axios.get(`https://medicineapp-api.herokuapp.com/ads?name=${name}`);
      return dispatch({type:'GET_NAME', payload: json.data})
      } catch (error) {
          alert('no tenemos un profesional con ese nombre')
      }
  }
};

//ad professional to favourites
export function addFavorite(payload) {
    return async function (dispatch) {
        console.log(payload)
      try {
        var json = await axios.put(`https://medicineapp-api.herokuapp.com/addFavorites`, payload);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
  }

  //remove favourites
  export function removeFavorite(payload) {
    return async function (dispatch) {
      try {
        var json = await axios.put(`https://medicineapp-api.herokuapp.com/removeFavorites`, payload);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function createMorningHours (payload) {
      return{
        type:'CREATE_MORNING_HOURS',
        payload
    }
  }

  export function createAfternoonHours (payload) {
    return{
      type:'CREATE_AFTERNOON_HOURS',
      payload
  }
}

// soft delete user from Data Base. 
export function deleteUserByID(userId){
  return async function (dispatch){
    try {
      const dbResponse = await axios.post(`https://medicineapp-api.herokuapp.com/delete/${userId}`)
      console.log('delete by id',dbResponse)
      return dispatch({
        type:'USER_DELETED',
        payload:dbResponse.data
      })
    } catch (e) {
      //console.log('este es el error de la action',e)
      if(e.response.data.message){
        return dispatch({
          type:'ERROR',
          payload:{
            message:e.response.data.message
          }
        })
      }else{
        return dispatch({
          type:'ERROR',
          payload:{
            message:e.message
          }
        })
      }
    }
  }
}



  export function putEditInfoAd(payload, idAd) {
    return async function (dispatch) {
      console.log(payload , idAd)
      try {
        await axios.put(`https://medicineapp-api.herokuapp.com/Ad/${idAd}`, payload);
      } catch (error) {
        console.log(error);
      }
    };
  }


  export function putEditInfoUser(payload , idUser) {
    return async function (dispatch) {
      console.log(payload , idUser)
      try {
         await axios.put(`https://medicineapp-api.herokuapp.com/user/${idUser}`, payload);
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
         await axios.put(`https://medicineapp-api.herokuapp.com/professional/${idUser}`, payload);
      } catch (error) {
        console.log(error);
      }
    };
  }
