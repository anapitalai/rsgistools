import React from 'react'
import { Row, Nav,Container } from 'react-bootstrap';


const LegendPanel = () => {
   

  const colors = [

    [
       'low', '#F2F12D'
     ],
     [
       'moderate', '#FFA500'
     ],
     [
       'severe', '#FF0000'
     ]

   ]

    return (

 <div>
    
<Container className="legend-panel">
        <label>Bleaching Severity Indicator</label>
         {colors.map((col) => {
             return (<div key={col[0]} className="input">
               <label>{col[0]}
               </label>
               <input className="legend-input" type="color" value={col[1]} disabled={true}
           
               />
             </div>
             )
           })
         } 
</Container>
 </div>
    );
  
}

export default LegendPanel

