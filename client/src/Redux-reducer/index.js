const inicialState = {
  ads: [],
  allAds:[],
  professionalProfile:{},
  adDetail:{}
  
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

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
