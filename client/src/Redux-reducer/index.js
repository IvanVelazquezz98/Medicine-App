const inicialState = {
  ads: [],
  allAds: [],
  professionalProfile: {},
  adDetail: {},
  users: [],
  allUsers: [],
  userDetail: {},
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };
    case "GET_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload,
      };

    case "GET_ADS":
      return {
        ...state,
        ads: action.payload,
        allAds: action.payload,
      };
    case "GET_PROFESSIONAL_DETAILS":
      return {
        ...state,
        professionalProfile: action.payload,
      };
    case "GET_AD_DETAILS":
      return {
        ...state,
        adDetail: action.payload,
      };
    case "FILTER_SPECIALTY":
     const allAds= state.ads
      const filterSpecalty = allAds.filter(
        (a) => a.specialty === action.payload
      );
      return {
        ...state,
        ads: filterSpecalty,
      };
    case "FILTER_COUNTRY":
  
      const filterCountry = allAds.filter(
        (a) => a.professional.user.country === action.payload
      );
      return {
        ...state,
        ads: filterCountry,
      };
    case 'FILTER_PROVINCE':
      let allAds2 = state.ads;
      const filterProvince = allAds2.filter(
        (a) => a.professional.user.province === action.payload
      );
      return {
        ...state,
        ads: filterProvince,
      };
      case 'FILTER_CITY':
        let allAds4 = state.ads;
        const filterCity = allAds4.filter(
          (a) => a.professional.user.city === action.payload
        );
        return {
          ...state,
          ads: filterCity,
        };
    case 'FILTER_TYPE_SERVICE':
      let allAds3 = state.ads;
      const filterTypeService = allAds3.filter(
        (a) => a.serviceType === action.payload
      );
      return {
        ...state,
        ads: filterTypeService,
      };
   
    case 'FILTER_RANKING':
      let allAds5 = state.ads;
      const filterRanking = allAds5.filter(
        (a) => a.professional.ranking === action.payload
      );
      return {
        ...state,
        ads: filterRanking,
      };
      

    default:
      return state;
  }
};

export default rootReducer;
