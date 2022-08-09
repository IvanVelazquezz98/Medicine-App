const inicialState = {
  ads: [],
  adDetail: {},
  allAds: [],
  allUsers: [],
  filterAd:[],
  professionalProfile: {},
  userDetail: {},
  users: [],
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

    case "FILTER_ALL_ADS":
      return {
        ...state,
        ads:action.payload,
        filterAd: action.payload
      }
      case 'FILTER_TYPE_SERVICE':
        let allAds3 = state.ads;
        let filterAd = state.filterAd
        if (filterAd.length===0){
          let filterTypeService = allAds3.filter(
            (a) => a.serviceType === action.payload
          );
          return {
            ...state,
            filterAd: filterTypeService,
            ads:filterTypeService
          };
        }
        else{
           let filterTypeService = filterAd.filter(
            (a) => a.serviceType === action.payload
          );
          return {
            ...state,
            filterAd: filterTypeService,
            ads:filterTypeService
          };
        }
   
   
    // case 'FILTER_RANKING':
    //   let allAds5 = state.ads;
    //   const filterRanking = allAds5.filter(
    //     (a) => a.professional.ranking === action.payload
    //   );
    //   return {
    //     ...state,
    //     ads: filterRanking,
    //   };
    case 'GET_NAME':
      
      return{
        ...state,
        ads: action.payload
      }  
      

    default:
      return state;
  }
};

export default rootReducer;
