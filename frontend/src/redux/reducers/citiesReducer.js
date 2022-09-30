const initialState = {
    cities: [], //estado inicial
    oneCity: {},
    filter: []
}

const citiesReducer = (state = initialState, action) =>{

    switch(action.type){ //condiciones que especifico en cada case y sino coincide va a default action = funcion 
        case 'GET_CITIES': //condicion "get_cities"
            return{
                ...state,
                cities: action.payload,
                filter: action.payload //cargo todas las ciudades en el filter
            }
            case 'GET_ONE_CITY':
                return{
                    ...state,
                    oneCity: action.payload
                }
            case 'FILTER_CITIES': //actualiza del state el filter manteniendo los datos previos (...state, de lo contrario se borra)
                let cityFilter = state.cities.filter((e) => e.name.toLowerCase().startsWith(action.payload.toLowerCase().trim()));
                return{
                    ...state,
                    filter: cityFilter
                }
        default:
            return state
    }
}

export default citiesReducer
//El populate: si les preguntan para que lo usamos digan que para traer info de precisa de la city jajaja

//Que pasa si se modifica el estado del store?
//Se te actualiza todo en la app que esté suscripto a ese estado