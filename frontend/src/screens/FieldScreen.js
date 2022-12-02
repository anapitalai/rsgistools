import React from 'react'
import { Button, Image } from 'react-bootstrap'
import MarineLifeCarousel from '../components/MarineLifeCarousel'
import FieldTripCarousel from '../components/FieldTripCarousel'
import NOAACarousel from '../components/NOAACarousel'
import MortalityCarousel from '../components/MortalityCarousel'


const FieldScreen = () => {
    return (
        <div>

           <FieldTripCarousel />
           <h1>Field Work</h1>
           <p>Ground truthing data was collected from the site area over a period of two days.</p>

        </div>
    )
}

export default FieldScreen
