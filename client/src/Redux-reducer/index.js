const inicialState = {
  ads: [],
  allAds:[]
  
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case "GET_ADS":
      return {
        ...state,
        ads: action.payload,
        allAds: action.payload,
      };
  
    default:
      return state;
  }
};

export default rootReducer;
