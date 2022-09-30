import React, {useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


export default function GoogleSignIn() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleCallbackResponse(response) {
        //console.log(response.credential)
        let userObject = jwt_decode(response.credential)
        //console.log(userObject)
        let res = await dispatch(userActions.signIn({
            nameUser: userObject.given_name,
            lastNameUser: userObject.family_name, 
            photoUser: userObject.picture, 
            mail: userObject.email, 
            password: userObject.jti,  
            from: 'google',
        }))
        if (res && res.data.success) {
            try {
                navigate("/home",{replace:true}) //redirecciona
            } catch(error) {
                console.log(error)
            }
        } else {
            toast.error(res.data.message)
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '354356372921-pk9tdfdjahkaenlk4cqs9qcqktalhcqe.apps.googleusercontent.com',
            callback: handleCallbackResponse})
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium" })
    })

    return (
        <div>
            <div id='buttonDiv'>
            </div>
        </div>
    )
}
