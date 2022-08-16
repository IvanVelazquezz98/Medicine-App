const inicialState = {
  ads: [],
  adDetail: {},
  allAds: [],
  allUsers: [],
  filterAd:[],
  professionalProfile: {},
  userDetail: {},
  users: [],
  morningHours:[],
  afternoonHours:[],
  professionalAppointments:[],
  userRestore:{}
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
      console.log('soy el user', action)
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

    case 'CREATE_MORNING_HOURS':
       
        let timeEnd=action.payload.morningEndTime.split(':')
        
        let timeM=action.payload.morningStartTime.split(':')

        let x=Number(timeM[0])+Number(timeM[1])/60
        
        let y= Number(timeEnd[0])+ Number(timeEnd[1])/60
        
        let actual = x
        
        let siguiente= actual
        let horarioEntero=[]
        let durationtime=parseFloat((action.payload.duration/60).toFixed(2))
        do {
            actual =siguiente + durationtime
            horarioEntero.push(siguiente)
            siguiente=actual
        } 
        while (siguiente < y);
        let hours = horarioEntero.map(el=>{

            let hour=el.toString().split('.')[0]
            hour = (hour < 10)? '0' + hour : hour;
            var min = Math.round((el-Number(hour))*60)
            let r = min.toString().split('')
            if(r[1]!=='0' || r[1]!== '5'){
              if(r.length===1 && Number(r[0]) < 10){
                r[0]= '0'
                r=[r[0]]
                min='0'
              }
                r[1]= '0'
                r=[r[0], r[1]]
            
            min= r.join('')  
        }
    
        let minute = min
        // minute = (minute < 10)? '0' + minute : minute;
            if(minute===0){
              return hour + ': 00'
            }return hour + ':' + minute;
        })
        return {
          ...state,
          morningHours:hours

        }
      
      case 'CREATE_AFTERNOON_HOURS':
        let afternoonTimeEnd=action.payload.afternoonEndTime.split(':') 
        let afternoonTimeM=action.payload.afternoonStartTime.split(':')
        let aftX=Number(afternoonTimeM[0])+Number(afternoonTimeM[1])/60
        let aftY= Number(afternoonTimeEnd[0])+ Number(afternoonTimeEnd[1])/60
        let aftActual =aftX
        let aftSiguiente= aftActual
        let aftHorarioEntero=[]
        let aftDurationtime=parseFloat((action.payload.duration/60).toFixed(2))  
        do {
          aftActual =aftSiguiente+ aftDurationtime
          aftHorarioEntero.push(aftSiguiente)
            aftSiguiente=aftActual
        } 
        while (aftSiguiente < aftY);
        let aftHours=aftHorarioEntero.map(el=>{
            let hour=el.toString().split('.')[0]
            hour = (hour < 10)? '0' + hour : hour;
            var min = Math.round((el-Number(hour))*60)
            let r = min.toString().split('') 
            if(r[1]!=='0' || r[1]!== '5'){
              if(r.length===1 && Number(r[0]) < 10){
                r[0]= '0'
                r=[r[0]]
                min='0'
              }
                r[1]= '0'
                r=[r[0], r[1]]
            
            min= r.join('')  
        }
    
        let minute = min
        // minute = (minute < 10)? '0' + minute : minute;
        if(minute===0){
          return hour + ': 00'
        }return hour + ':' + minute;
        })
        console.log('aftHours',aftHours)
        const aftHoursFilter=[]
        aftHours.map(el=>{
          if(!state.morningHours.includes(el)){
              aftHoursFilter.push(el)
            }          
        })
        return {
          ...state,
          afternoonHours:aftHoursFilter
        }

        case "CLEAR_USER_DETAIL":
          return {
            ...state,
            userDetail: {},
          }    

    case 'GET_PROFESSIONAL_APPOINTMENTS':
      console.log('reducer', action.payload)
      return{
        ...state,
        professionalAppointments:action.payload
      }

      case 'USER_RESTORE':
        return {
          ...state,
          userRestore:action.payload
        }





    default:
      return state;
  }
};



export default rootReducer;
