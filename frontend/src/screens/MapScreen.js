import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Row, Nav,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import ReactMapGL, { Marker, Popup, Source, Layer,LayerProps,NavigationControl,FullscreenControl,FillLayer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { dataLayer } from '../map-style'
import axios from 'axios';
import SideBar from '../components/map-components/SideBar';
import { listStores } from '../actions/storeActions';
import {listMultiCoral} from '../actions/coralMultiActions';
import ControlPanel from '../components/map-components/ControlPanel';
import {listTemperatures} from '../actions/temperatureActions';


const pointLayer = {
	id: 'point',
	type: 'circle',
	paint: {
	  'circle-radius': 10,
	  'circle-color': '#007cbf'
	  //'circle-color' : '#000'
	}
  };


function MapScreen({ history, match }) {

	const [pointData, setPointData] = useState(null);

	
	const [ viewport, setViewport ] = useState({
		latitude: -6.635908,
		longitude: 147.864312,
		width: '100vw',
		height: '100vh',
		zoom: 16,
		// pitch:180
	});
	
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const storeList = useSelector((state) => state.storeList);
	const { loading, error, stores, page, pages } = storeList;

	//coral stuff multipolygon
	const coralMultiList = useSelector((state) => state.coralMultiList);
	const { loadingCoral, errorCoral, corals, pageCoral, pagesCoral } = coralMultiList;

	const temperatureList = useSelector((state) => state.temperatureList);
	const { loadingTemperature, errorTemperature, temperatures, pageTemperature, pagesTemperature } = temperatureList;
     
	const userLogin = useSelector((state) => state.userLogin);
	const {userInfo} = userLogin

	
	useEffect(
		() => {
			dispatch(listMultiCoral());
	       console.log('corals',corals)
		},
		[ dispatch ]
	);

		
	useEffect(
		() => {
			dispatch(listTemperatures());
	   
		},
		[ dispatch ]
	);


	useEffect(
		() => {
			dispatch(listStores());
			console.log('stores',stores)

		},
		[ dispatch ]
	);



	const layerStyle = {
		id: 'point',
		type: 'circle',
		paint: {
			'circle-radius': 5,
			'circle-color': '#fff'
		}
	};


	const severeLayer:FillLayer={
		id:"severe",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#FF0000',
			'fill-color': '#FF0000',  //red  
			'fill-opacity': 0.85
		}
	}
	const b22Layer:FillLayer={
		id:"b22",
		type:"fill",
		source:"route",
		'fill-outline-color': '#000000',
		'fill-color': '#cc599f',
		'fill-opacity': 0.11,

		paint:{
			'fill-outline-color': '#664433',
			'fill-color': '#fe599f',
			'fill-opacity': 0.75
			
		}
	}
	const moderateLayer:FillLayer={
		id:"moderate",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#FFA500',  
			'fill-color': '#FFA500', //yellow
			'fill-opacity': 0.55
		}
	}


	
	const lowLayer:FillLayer={
		id:"low",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#F2F12D',  
			'fill-color': '#F2F12D', //orange
			'fill-opacity': 1.0
		}
	}

		
	const mildLayer:FillLayer={
		id:"mild",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#008899',  
			'fill-color': '#F2F12D', //orange
			'fill-opacity': 1.0
		}
	}

	const geomLayer:FillLayer={
		id:"geom",
		type:"fill",
		source:"route",
		paint: {
			'fill-outline-color': '#484896',
			'fill-color': '#6e599f',
			'fill-opacity': 0.75
		  }
	}


	//onHover functionality
const [onHover,setonHover] =useState(null)
const [onCoralHover,setonCoralHover] = useState(null)

	return (
		<div className="">
 
			<LinkContainer to="/store">
				<Nav.Link>
					<i className="fas fa-upload" /> + STUDY AREA
				</Nav.Link>
			</LinkContainer>

			
			<LinkContainer to="/admin/multi">
				<Nav.Link>
					<i className="fas fa-upload" /> + CORAL DATA
				</Nav.Link>
			</LinkContainer>
			<SideBar />	
			<ReactMapGL
				initialViewState={{ ...viewport }}
				mapboxAccessToken="pk.eyJ1IjoiYW5hcGl0YWxhaSIsImEiOiJjbDdlYzRjNjQwOXUxM3dwbGNxd3V5bDN3In0.QsuXMK_1u4kBZEht5QaO3w"
				style={{ width: 1000, height: 1000 }}
				mapStyle="mapbox://styles/anapitalai/cl8dw9b8f000d14rtgqhu1exx"
			    onHover={onHover}
				onViewportChange={(viewport) => {
					setViewport(viewport);
				}}
			>
{/* 
				{loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :(<>{stores.map(s => (

					<Marker key={s.storeId} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
						<img onMouseEnter={()=>{
							setonHover(s)	}}
							onMouseLeave={()=>{
							setonHover(null)}} 
							className='marker' src="/a.png" />
					</Marker>
				 
				))}</>)} */}


{loadingTemperature ? (<Loader />) : error ? (<Message variant='danger'>{errorTemperature}</Message>) :(<>{temperatures.map(s => (

<Marker key={s._id} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
	<img onMouseEnter={()=>{
		setonHover(s)	}}
		onMouseLeave={()=>{
		setonHover(null)}} 
		className='marker' src="/t.jpeg" />
		{/* <i class="fa-solid fa-temperature-three-quarters"></i> */}
</Marker>

))}</>)}
                 
                 {/* <Source id="low" type="geojson" data={corals[2]} >
                          <Layer
                            {...lowLayer} />
                     </Source> 

				<Source id="moderate" type="geojson" data={corals[1]} >
				<Layer {...moderateLayer} /> 
				</Source>  */}
				 <Source id="severe" type="geojson" data={corals[0]} >
				 <Layer {...severeLayer} />
				 </Source> 


				 {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>

        )} 

<NavigationControl position="top-left" />
<FullscreenControl />



        {onHover ? (
			                <Popup
                                  latitude={onHover.location.coordinates[1]}
                                  longitude={onHover.location.coordinates[0]}
                                  anchor="bottom" >
							<h4> {onHover.location_name} Temperature Data</h4><h5>{onHover.date}</h5>
							<h4>{onHover.time}</h4>
							   <h5>{onHover.temp_depth_3m}M @3M</h5>
							   <h5>{onHover.temp_depth_5_5m}M @5.5M</h5>
							   <h5>{onHover.temp_depth_9m}M @9M</h5>
						   </Popup>

		) : null }

{onCoralHover ? (
			                <Popup
                                  latitude={onCoralHover.features.geometry.coordinates[1]}
                                  longitude={onCoralHover.features.geometry.coordinates[0]}
                                  anchor="bottom" >
							  <h6> {onCoralHover.name}</h6>
							
						   </Popup>

		) : null }
		
		
			</ReactMapGL>
		
			
			
		</div>
	);
}
export default MapScreen


