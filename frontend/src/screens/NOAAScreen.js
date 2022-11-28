import React from 'react'
import { Button, Image } from 'react-bootstrap'
import MarineLifeCarousel from '../components/MarineLifeCarousel'
import FieldTripCarousel from '../components/FieldTripCarousel'
import NOAACarousel from '../components/NOAACarousel'
import MortalityCarousel from '../components/MortalityCarousel'


const NOAAScreen = () => {
    return (
        <div>
           <NOAACarousel />
           <h1>NOAA Coral Reef Alerts</h1>
           <p>NOAA images showing warnings of coral bleached areas, Papua New Guinea is experiencing coral bleaching.</p>



        </div>
    )
}

export default NOAAScreen
