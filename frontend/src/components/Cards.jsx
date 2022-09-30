import React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Link as LinkRouter } from "react-router-dom";
import Notresult from '../components/Notresult'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function TitlebarImageList() {

    const [search, setSearch] = useState("")
    const dispatch = useDispatch() //guardamos en una const porque useDispatch no se puede usar un hook dentro de un hook

    useEffect(()=>{
        dispatch(citiesActions.filterCities(search))//dispachea la accion, esto pasa por el reducer
        // eslint-disable-next-line
    },[search])

    const filter = useSelector(store=>store.citiesReducer.filter)//trae los datos del store
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <>
        <div className='citiesCenter'>
            <h1>Search your destination</h1>
            <input onKeyUp={(e) => { setSearch(e.target.value) }} type="text" title="Search" placeholder="Example: Kyoto" ></input>
        </div>
        {(filter.length === 0)?
        <Notresult/> : <ImageList gap={8} cols= {matches?2:1} sx={{ width: "90vw"}}>
        {filter.map((city) => (
            <ImageListItem key={city._id}>
                <img
                    src={city.image}
                    srcSet={city.image}
                    alt={city.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={city.name}
                    subtitle={city.country}
                    actionIcon={
                        <LinkRouter onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/cities/${city._id}`}>
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${city.title}`}
                        >
                            <Button className="btnBackToCities"component="span" variant="contained">Details</Button>
                        </IconButton>
                        </LinkRouter>
                    }
                />
            </ImageListItem>
        ))}
    </ImageList>
        }
        </>
    );
}
