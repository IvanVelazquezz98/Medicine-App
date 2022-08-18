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
       
        let timeEnd=action.payload.morningEndTime.split(':')
        
        let timeM=action.payload.morningStartTime.split(':')

        let x=Number(timeM[0])+Number(timeM[1])/60
        
        let y= Number(timeEnd[0])+ Number(timeEnd[1])/60
        
        let current = x
        
        let next= current
        let numHour=[]
        let durationtime=parseFloat((action.payload.duration/60).toFixed(2))
        do {
            current =next + durationtime
            numHour.push(next)
            next=current
        } 
        while (next < y);
      
      
        let objHours = numHour.map(e => {
          return{ start: e, end:e + durationtime}   
      });
      
      
      
      let hours= objHours.map(el=>{
          let hrStart=el.start.toString().split('.')[0]
          var hourStart = hrStart;
          hourStart = (hourStart < 10)? '0' + hourStart : hourStart;
          var minStart = Math.round((el.start-Number(hrStart))*60)
          
          
          let rStart= minStart.toString().split('')
          
      
            if(rStart[1]!=='0' || rStart[1]!== '5'){
              
                if(rStart.length===1 && Number(rStart[0]) < 10){
                 
                 rStart[0]= '0'
                 rStart=[rStart[0]]
                 
      
                    minStart='0'
                }
                rStart[1]= '0'
                rStart=[rStart[0], rStart[1]]
              
              minStart= rStart.join('')   
          }
      
          let minuteStart = minStart
          // minute = (minute < 10)? '0' + minute : minute;
          
      
          let hrEnd=el.end.toString().split('.')[0]
          var hourEnd = hrEnd;
          hourEnd = (hourEnd < 10)? '0' + hourEnd : hourEnd;
          var minEnd = Math.round((el.end-Number(hrEnd))*60)
          
          
          let rEnd= minEnd.toString().split('')
          
      
            if(rEnd[1]!=='0' || rEnd[1]!== '5'){
              
                if(rEnd.length===1 && Number(rEnd[0]) < 10){
                 console.log(rEnd)
                 rEnd[0]= '0'
                 rEnd=[rEnd[0]]
          
      
                    minEnd='0'
                }
                rEnd[1]= '0'
                rEnd=[rEnd[0], rEnd[1]]
              
              minEnd= rEnd.join('')   
          }
      
          let minuteEnd = minEnd
          // minute = (minute < 10)? '0' + minute : minute;
          
          
             return{
              start:hourStart + ':' + minuteStart,
              end:hourEnd + ':' + minuteEnd
             } 
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
        let aftCurrent = aftX
        
        let aftNext= aftCurrent
        let aftNumHour=[]
        let aftDurationtime=parseFloat((action.payload.duration/60).toFixed(2))
        do {
            aftCurrent =aftNext + aftDurationtime
            aftNumHour.push(aftNext)
            aftNext=aftCurrent
        } 
        while (aftNext < aftY);
      
      
        let aftObjHours = aftNumHour.map(e => {
          return{ start: e, end:e + aftDurationtime}   
      });
      
      
      
      let aftHours= aftObjHours.map(el=>{
          let hrStart=el.start.toString().split('.')[0]
          var hourStart = hrStart;
          hourStart = (hourStart < 10)? '0' + hourStart : hourStart;
          var minStart = Math.round((el.start-Number(hrStart))*60)
          
          
          let rStart= minStart.toString().split('')
          
      
            if(rStart[1]!=='0' || rStart[1]!== '5'){
              
                if(rStart.length===1 && Number(rStart[0]) < 10){
                 
                 rStart[0]= '0'
                 rStart=[rStart[0]]
                 
      
                    minStart='0'
                }
                rStart[1]= '0'
                rStart=[rStart[0], rStart[1]]
              
              minStart= rStart.join('')   
          }
      
          let minuteStart = minStart
          // minute = (minute < 10)? '0' + minute : minute;
          
      
          let hrEnd=el.end.toString().split('.')[0]
          var hourEnd = hrEnd;
          hourEnd = (hourEnd < 10)? '0' + hourEnd : hourEnd;
          var minEnd = Math.round((el.end-Number(hrEnd))*60)
          
          
          let rEnd= minEnd.toString().split('')
          
      
            if(rEnd[1]!=='0' || rEnd[1]!== '5'){
              
                if(rEnd.length===1 && Number(rEnd[0]) < 10){
                 console.log(rEnd)
                 rEnd[0]= '0'
                 rEnd=[rEnd[0]]
              
      
                    minEnd='0'
                }
                rEnd[1]= '0'
                rEnd=[rEnd[0], rEnd[1]]
              
              minEnd= rEnd.join('')   
          }
      
          let minuteEnd = minEnd
          // minute = (minute < 10)? '0' + minute : minute;
          
          
             return{
              start:hourStart + ':' + minuteStart,
              end:hourEnd + ':' + minuteEnd
             } 
        })

        const morning=[...state.morningHours]
        console.log(morning)
        console.log('aftHours',aftHours)
        let aftHoursFilter =[]
         for (let i = 0; i < aftHours.length; i++) {
          for (let j = 0; j <morning.length; j++) {
            let Ah= Number(aftHours[i].start.split(':')[0])+ Number(aftHours[i].start.split(':')[1])/60
            console.log(Ah)
            let Ms= Number(morning[j].start.split(':')[0])+ Number(morning[j].start.split(':')[1])/60
            console.log(Ms)
            let Me= Number(morning[j].end.split(':')[0])+ Number(morning[j].end.split(':')[1])/60
            console.log(Me)
            if(! (Ah >= Ms && Ah < Me)){
              aftHoursFilter.push(aftHours[i])
            }
          }
        } 
        console.log('filtrado', aftHoursFilter)
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

    case "GET_COUNTRIES":
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
