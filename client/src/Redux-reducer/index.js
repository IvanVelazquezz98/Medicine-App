const inicialState = {
  ads: [],
  adDetail: {},
  allAds: [],
  allUsers: [],
  filterAd: [],
  professionalProfile: {},
  userDetail: {},
  users: [],
  morningHours:[],
  afternoonHours:[],
  professionalAppointments:[],
  countries:[],
  states:[],
  cities:[],
  userRestore:{},
  eventClick:{},
  selectedTime:false,
  availablesApps:[],
  userAppointments:[],
  todo:[],

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
      console.log("soy el user", action);
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

    case 'ORDER_RANKING':
     
      let orderRanking= [...state.ads]
      orderRanking= action.payload==="minor"?
      orderRanking.sort((a,b)=>{
        if(a.professional.ranking>b.professional.ranking) return-1;
        if(a.professional.ranking<b.professional.ranking) return 1;
        return 0
      }):
      orderRanking.sort((a,b)=>{
        if(a.professional.ranking<b.professional.ranking) return-1;
        if(a.professional.ranking>b.professional.ranking) return 1;
        return 0
      })
      
      return {
        ...state,
        ads: orderRanking,
      };
      case 'ORDER_PRICE':
        console.log('soy el payload',action.payload)
      let orderPrice= [...state.ads];
       orderPrice= action.payload=== 'minior'?orderPrice.sort((a,b)=>{

        if(parseInt(a.price) < parseInt(b.price)) return-1;
        if(parseInt(a.price) > parseInt(b.price)) return 1;
        return 0
      }):
      orderPrice.sort((a,b)=>{
        if(parseInt(a.price) > parseInt(b.price)) return-1;
        if(parseInt(a.price) < parseInt(b.price)) return 1;
        return 0
      })
      //console.log('soy el reducer',orderPrice);
      
      return {
        ...state,
        ads: orderPrice,
      };

    case "GET_NAME":
      return {
        ...state,
        ads: action.payload,
      };

      case 'CREATE_MORNING_HOURS':
       return {
        ...state,
        morningHours: action.payload
       }
       
      case 'CREATE_AFTERNOON_HOURS':
        
       // console.log('filtrado', aftHoursFilter)
        return {
          ...state,
          afternoonHours: action.payload
        }

    case "CLEAR_USER_DETAIL":
      return {
        ...state,
        userDetail: {},
      };

    case "GET_PROFESSIONAL_APPOINTMENTS":
      console.log("reducer", action.payload);
      return {
        ...state,
        professionalAppointments: action.payload,
      };

    case 'GET_COUNTRIES':
      console.log('action.payload', action.payload);
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_STATES":
      return {
        ...state,
        states: action.payload,
      };
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };

    case "USER_RESTORE":
      return {
        ...state,
        userRestore: action.payload,
      };
    case "FILTER_ALL_ADS":
      return {
        ...state,
        ads: action.payload,
      };

    case "INFO_CALENDAR_EVENT":
      return {
        ...state,
        eventClick: action.payload,
        selected: true,
      };
    case "GET_AVAILABLE_APPS":
      console.log("reducer", action.payload);
      return {
        ...state,
        availablesApps: action.payload,
      };
      case 'GET_USER_APPOINTMENTS':
        return{
          ...state,
          userAppointments:action.payload
        }
    case 'EVENT_SELECTED':
      return{
        ...state,
        selectedTime:action.payload
      }
    case 'DELETED_APPOINTMENT':
      return {
        ...state,
        deletedAppointment:action.payload
      }
    case "CLEAR_USER_APPOINTMENTS":
      return {
        ...state,
        userAppointments: [],
      };
    case 'TRAEME_TODO':
      return{
        ...state,
        todo: action.payload
      }
    case "CLEAR_AD_DETAILS":
      return {
        ...state,
        adDetail: {},
      }
    case "CLEAR_TODO":
      return {
        ...state,
        todo: [],
      }

case "GET_USERS_BY_ADMIN":
  return {
    ...state,
    users: [action.payload],
  };


  case "FILTER_BY_ADMIN":
    return {
      ...state,
      users: action.payload,
    };


  default:
    return state;
}
};




export default rootReducer;
