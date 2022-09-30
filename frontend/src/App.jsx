import './style/App.css';
import Cities from './pages/Cities';
import SignUp from './components/SignUp';
import LogIn from './components/SignIn';
import {Routes, Route} from 'react-router-dom'
import Index from './pages/Index';
import ScrollToTop from "react-scroll-to-top";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Details from './components/Details'
import citiesActions from './redux/actions/citiesActions';
import userActions from './redux/actions/userActions';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';



function App() {

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => { //cuando recarga la pagina el user no pierde el logeo por que el token queda en el localstorage
    if(localStorage.getItem('token')!== null) { //si el localS el item es distinto de null 
        const token = localStorage.getItem("token")
        dispatch(userActions.verifyToken(token))
    }
    // eslint-disable-next-line
},[])

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(citiesActions.getCities())
    // eslint-disable-next-line
  }, [])

  return (
    <>
    <ScrollToTop
        style= {{backgroundColor:"rgb(11, 11, 256)", bottom: "20px"}}
            smooth
            viewBox="0 0 24 24"
            component= {<ArrowCircleUpIcon sx={{color: 'white'}}/>}
            // svgPath="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"
            />
    <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="*" element={<Index/>}/>
      <Route path="/home" element={<Index/>}/>
      <Route path="/cities" element={<Cities/>}/>
      <Route path="/cities/:id" element={<Details/>}/>
      {!user &&<Route path="/login" element={<LogIn/>}/>}
      {!user &&<Route path="/signup" element={<SignUp/>}/>}
    </Routes>
    </>
  )
}

export default App; 