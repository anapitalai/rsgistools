import React from 'react'
import { Button, Image } from 'react-bootstrap'
import MarineLifeCarousel from '../components/MarineLifeCarousel'
import FieldTripCarousel from '../components/FieldTripCarousel'
import NOAACarousel from '../components/NOAACarousel'
import MortalityCarousel from '../components/MortalityCarousel'


const CoralLifeScreen = () => {
    return (
        <div>
            {/* <h1>Field Trip</h1>
           <FieldTripCarousel />
           <h1>Marin Life in the Study Area</h1> */}
   
           <MortalityCarousel />
           <h1>Coral Mortality and Bleaching</h1>
           <p>Some images of coral life and bleaching that were taken on the visited site area.</p>

           {/* <MortalityCarousel />
           <h1>NOAA Data</h1>
  
           <NOAACarousel /> */}

           {/* <Image src='/marine/cnml1.jpg' alt='product.name' fluid />
           <Image src='/marine/cnml5.JPG' alt='product.name' fluid />

           <Image src='/marine/cnml6.JPG' alt='product.name' thumbnail /> */}


        </div>
    )
}

export default CoralLifeScreen
