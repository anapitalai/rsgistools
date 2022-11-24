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

// import React, { PureComponent } from 'react';

// const defaultContainer = ({ children }) => <div className="legend-panel">{children}</div>;

// const colors = [

//   [
//     0, '#F2F12D'
//   ],
//   [
//     1, '#EED322'
//   ],
//   [
//     2, '#E6B71E'
//   ],
//   [
//     3, '#DA9C20'
//   ],
//   [
//     4, '#CA8323'
//   ],
//   [
//     5, '#B86B25'
//   ],
//   [
//     6, '#A25626'
//   ],
//   [
//     7, '#8B4225'
//   ],
//   [
//     8, '#723122'
//   ]

// ]

// export default class LegendPanel extends PureComponent {

//   render() {
//     const Container = this.props.containerComponent || defaultContainer;
//     return (
//       <Container>
//         <label>Events</label>
//         {
//           colors.map((vaue) => {
//             return (<div key={vaue[0]} className="input">
//               <label>{vaue[0]}
//               </label>
//               <input className="legend-input" type="color" value={vaue[1]} disabled={true}
//               // onChange={this._onColorChange.bind(this, name)}
//               />
//             </div>
//             )
//           })
//         }
//       </Container>
//     );
//   }
// }

