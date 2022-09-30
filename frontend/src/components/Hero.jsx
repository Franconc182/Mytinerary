import React from "react";
import '../style/styles.css';
import {Link as LinkRouter} from 'react-router-dom';
import Button from '@mui/material/Button';


function Body(){

    return (
        <div className='body'>
            <h1 className="backgroundtitle">MyTinerary</h1>
            <h3 className="backgroundBody">Find your perfect trip, designed by insiders
                who know and love their cities!</h3>
                <div>
                <LinkRouter to='/cities'>
                <Button component="span" variant="contained" className="btn">Click for the new adventure!</Button>
                </LinkRouter>
                </div>
        </div>
    )
}
export default Body