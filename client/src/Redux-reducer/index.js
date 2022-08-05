const inicialState = {
  ads: [],
  allAds:[],
  professionalProfile:{},
  adDetail:{},
  users:[],
  allUsers:[],
  userDetail:{}

  
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case "GET_USERS":
      return{
        ...state,
        users : action.payload,
        allUsers: action.payload

      }
    case "GET_USER_DETAIL":
      return{
        ...state,
        userDetail: action.payload
      }

    case "GET_ADS":
      return {
        ...state,
        ads: action.payload,
        allAds: action.payload,
      };
    case 'GET_PROFESSIONAL_DETAILS':
      return {
        ...state,
        professionalProfile:action.payload
      }
    case 'GET_AD_DETAILS':
      return {
        ...state,
        adDetail:action.payload
      }

  
    default:
      return state;
  }
};

export default rootReducer;
