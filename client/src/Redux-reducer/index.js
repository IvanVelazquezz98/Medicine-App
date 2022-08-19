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
  userAppointments:[]

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

    // case 'FILTER_RANKING':
    //   let allAds5 = state.ads;
    //   const filterRanking = allAds5.filter(
    //     (a) => a.professional.ranking === action.payload
    //   );
    //   return {
    //     ...state,
    //     ads: filterRanking,
    //   };
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
        const aftHours = action.payload
        const morning=[...state.morningHours]
        
          let aftHoursFilter = []
          for (let i = 0; i < aftHours.length; i++) {
            for (let j = 0; j <morning.length; j++) {
              let As= Number(aftHours[i].start.split(':')[0])+ Number(aftHours[i].start.split(':')[1])/60
                     // console.log(Ah)
              let Aend= Number(aftHours[i].end.split(':')[0])+ Number(aftHours[i].end.split(':')[1])/60  
              let Ms= Number(morning[j].start.split(':')[0])+ Number(morning[j].start.split(':')[1])/60
                     // console.log(Ms)
              let Me= Number(morning[j].end.split(':')[0])+ Number(morning[j].end.split(':')[1])/60
                     // console.log(Me)
              if(! (As >= Ms && As < Me) || !(Ms >=As && Ms < Aend )){
                aftHoursFilter.push(aftHours[i])
              }
            }
           }
       // console.log('filtrado', aftHoursFilter)
        return {
          ...state,
          afternoonHours:aftHoursFilter
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
  

    default:
      return state;
  }
};

export default rootReducer;
