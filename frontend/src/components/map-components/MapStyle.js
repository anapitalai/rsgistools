import {FillLayer} from 'react-map-gl'


export const pointLayer = {
	id: 'point',
	type: 'circle',
	paint: {
	  'circle-radius': 10,
	  'circle-color': '#007cbf'
	  //'circle-color' : '#000'
	}
  };



export const severeLayer9:FillLayer={
  id:"severe9",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'green',
    'fill-color': 'green',  //red  
    'fill-opacity': 0.85
  }
}

export const moderateLayer9:FillLayer={
  id:"moderate9",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'orange',  
    'fill-color': '#FFA500', //yellow
    'fill-opacity': 0.55
  }
}

export const lowLayer9:FillLayer={
  id:'low9',
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'yellow',  
    'fill-color': 'yellow', //orange #F2F12D
    'fill-opacity': 1.0
  }
}

export const lowLayer10:FillLayer={
  id:'low10',
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': '#2E8B57 ',  
    'fill-color': '#2E8B57 ', //orange
    'fill-opacity': 1.0
  }
}

export const severeLayer10:FillLayer={
  id:"severe10",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'blue',
    'fill-color': 'blue',  //crimson
    'fill-opacity': 0.85
  }
}

export const moderateLayer10:FillLayer={
  id:"moderate10",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'crimson',  
    'fill-color': 'crimson',
    'fill-opacity': 0.55
  }
}



export const severeLayer11:FillLayer={
  id:"severe11",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'red',
    'fill-color': 'red',  //red  
    'fill-opacity': 0.85
  }
}

export const moderateLayer11:FillLayer={
  id:"moderate11",
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'orange',  
    'fill-color': 'orange', //yellow
    'fill-opacity': 0.55
  }
}
export const lowLayer11:FillLayer={
  id:'low11',
  type:"fill",
  source:"route",
  paint:{
    'fill-outline-color': 'yellow',  
    'fill-color': 'yellow', //crimson
    'fill-opacity': 0.5
  }
}


