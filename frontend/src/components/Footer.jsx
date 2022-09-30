import React from "react";
import "../style/navbar.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { pink } from "@mui/material/colors";
import {Link as LinkRouter} from 'react-router-dom';


function Footer() {
    return (
    <footer className="colorFooter">
        <div className="icons">
            <a href="https://facebook.com"><FacebookIcon sx={{fontSize: 50}}/></a>
            <a href="https://instagram.com"><InstagramIcon className="instagramIcon" sx={{fontSize: 50, color: pink[500]}}/></a>
            <a href="https://github.com/Franconc182"><GitHubIcon sx={{fontSize: 50, }}/></a>
        </div>
    <div className="buttonsFooter">
    <Stack direction="row" spacing={5}>
        <LinkRouter  to='/home'>
            <Button component="span" className="colorButton" variant="outlined" sx={{fontSize: 20}}>Home</Button>
        </LinkRouter>

        <LinkRouter to='/cities'>
            <Button component="span" className="colorButton" sx={{fontSize: 20}} variant="outlined" href="#outlined-buttons">Cities</Button>
        </LinkRouter>
    </Stack>
    </div>
        
    <div className="divMytineraryfranco">
        <h5 className="cofotter">MyTinerary</h5>
        <h5 className="cofotter">Franco Celiz - Cohort FS028</h5>
    </div>
    </footer>
);
}
export default Footer;
