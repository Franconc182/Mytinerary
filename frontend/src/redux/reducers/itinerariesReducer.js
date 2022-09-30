const initialState = {
    itineraries: [],
    activities: {}
}

const itinerariesReducer = (state = initialState, action) =>{ //itinerariesReducer requiere dos parametros iniciales

    switch(action.type){ //condiciones que especifico en cada case y sino coincide va a default action = funcion 
        case 'GET_ITINERARIES': //condicion "get_cities", caso
            return{
                ...state, //toma el estado incial y va a guardar en itineraries
                itineraries: action.payload, //action.payload = la carga de informacion que se despacha 
            }
        case 'GET_ACTIVITIES':
            return {
                ...state, //toma el estado incial y va a guardar en itineraries
                activities: {
                    ...state.activities, //toma el estado actual de activities y lo mantiene
                    ...action.payload // agrega la activity nueva
                }
            }
        default:
            return state
    }
}

export default itinerariesReducer