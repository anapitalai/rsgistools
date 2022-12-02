import React from 'react'
import { Button, Image } from 'react-bootstrap'
import MarineLifeCarousel from '../components/MarineLifeCarousel'
import FieldTripCarousel from '../components/FieldTripCarousel'
import NOAACarousel from '../components/NOAACarousel'
import MortalityCarousel from '../components/MortalityCarousel'


const MarineLifeScreen = () => {
    return (
        <div>
        
   
           <MarineLifeCarousel />
           <h1>Coral Species and Marine Life</h1>
           <p>Some images of coral and marine life that were taken on the visited site area.</p>


        </div>
    )
}

export default MarineLifeScreen
