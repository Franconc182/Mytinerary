import axios from "axios";

const citiesActions = {

    getCities: () =>{
        return async(dispatch, getCities) => {
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type:'GET_CITIES', payload:res.data.response.cities})
        }
    },

    getOneCity: (id) =>{
        return async(dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/cities/${id}`)
            dispatch({type:'GET_ONE_CITY', payload:res.data.response})
        }
    },
    filterCities: (input) =>{
        return (dispatch, getState) =>{
            dispatch({type: 'FILTER_CITIES', payload: input})
        }
    }
}
export default citiesActions