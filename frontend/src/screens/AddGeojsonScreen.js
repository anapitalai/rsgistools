// import React from 'react'

// const AddGeojsonScreen = () => {
//     return (
//         <div>
//             add geojson file here
//         </div>
//     )
// }

// export default AddGeojsonScreen

import React from "react";
import { parse } from "papaparse";

const AddGeojsonScreen=() =>{
  const [highlighted, setHighlighted] = React.useState(false);
  const [corals, setCorals] = React.useState([
    { email: "fake@gmail.com", name: "Fake" },
  ]);

const handleFile=()=>{

}
  
  return (
    <div>
      <h1 className="text-center text-4xl">GeoJSON Data Import</h1>
      <input type='file' name="file" onChange={e=>{
        
      }}/>

      <button>Submit File</button>
    </div>
  );
}

export default AddGeojsonScreen