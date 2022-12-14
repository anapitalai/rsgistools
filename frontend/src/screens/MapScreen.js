import React, { useState, useEffect, useCallback, useMemo,lazy, Suspense } from 'react';
import { Row, Nav,Col,Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import ReactMapGL, { Marker, Popup, Source, Layer,LayerProps,NavigationControl,FullscreenControl,FillLayer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { dataLayer } from '../map-style'
import axios from 'axios';
import SideBar from '../components/map-components/SideBar';

import {listMultiCoral} from '../actions/coralMultiActions';
import ControlPanel from '../components/map-components/ControlPanel';
import {listTemperatures} from '../actions/temperatureActions';
import CoralSearchBox from '../components/CoralSearchBox'
import {Route} from 'react-router-dom'
import LegendPanel from '../components/map-components/LegendPanel';

import CoralPanel from '../components/map-components/CoralPanel';
import {lowLayer9,moderateLayer9,severeLayer9,lowLayer10,moderateLayer10,severeLayer10,lowLayer11,moderateLayer11,severeLayer11,pointLayer} from '../components/map-components/MapStyle'

const layers=[lowLayer9,moderateLayer10]

function MapScreen({ history, match }) {
	const keyword = match.params.keyword

	const [pointData, setPointData] = useState(null);

	
	const [ viewport, setViewport ] = useState({
		latitude: -6.635908,
		longitude: 147.864312,
		// width: '100vw',
		//  height: '100vh',
		height: window.innerHeight,
		width: window.innerWidth,
		zoom: 15,
		// pitch:180

	},

	
	);
	

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
		dispatch(listMultiCoral(keyword))
	       console.log('corals',corals)
		},
		[ dispatch , keyword]
	)

		
	useEffect(
		() => {
			dispatch(listTemperatures());
	   
		},
		[ dispatch ]
	);


	useEffect(
		() => {
			//dispatch(listStores());
			console.log('stores',stores)

		},
		[ dispatch ]
	);



	//onHover functionality
const [onHover,setonHover] =useState(null)
const [onCoralHover,setonCoralHover] = useState(null)

//const cbleach = useMemo(()=>{return corals},[corals])

  
  
const coral_markers = useMemo(() => corals.map((m,index )=> (
	
<Source key={m._id} type="geojson" data={m}>

{m.name == "CBD_1122_Severe" ? (<Layer  source='route' type='fill' 
paint={{"fill-color":'red',"fill-opacity": 0.8}} />) : (m.name =="CBD_1122_Moderate" ? <Layer  source='route' type='fill'  
paint={{"fill-color":'orange',"fill-opacity": 0.8}} /> : <Layer  source='route' type='fill'  
paint={{"fill-color":'yellow',"fill-opacity": 0.8}} />)}
          		
    </Source>	
	)
  ), [corals]);

  const [mapStyle, setMapStyle] = useState(null);

	return (
		<div className="map">
 
			{/* <LinkContainer to="/store">
				<Nav.Link>
					<i className="fas fa-upload" /> + STUDY AREA
				</Nav.Link>
			</LinkContainer> */}

			
			<LinkContainer to="/admin/multi">
				<Nav.Link>
					<i className="fas fa-upload" /> + BLEACHING DATA
				</Nav.Link>
			</LinkContainer>
			            <Route render={({ history }) => <CoralSearchBox history={history} />} />

			<ReactMapGL
			
				initialViewState={{ ...viewport }}
				mapboxAccessToken="pk.eyJ1IjoiYW5hcGl0YWxhaSIsImEiOiJjbDdlYzRjNjQwOXUxM3dwbGNxd3V5bDN3In0.QsuXMK_1u4kBZEht5QaO3w"
				style={{ width:1000, height: 1000} }

				mapStyle="mapbox://styles/anapitalai/cl8dw9b8f000d14rtgqhu1exx"
			    onHover={onHover}
				onViewportChange={(viewport) => {
					setViewport(viewport);
				}}
			>


{loadingTemperature ? (<Loader />) : error ? (<Message variant='danger'>{errorTemperature}</Message>) :(<>{temperatures.map(s => (

<Marker key={s._id} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
	<img onMouseEnter={()=>{
		setonHover(s)	}}
		onMouseLeave={()=>{
		setonHover(null)}} 
		className='marker' src="/t.jpeg" />
</Marker>

))}</>)}


{coral_markers}



				 {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>

        )} 

<NavigationControl position="top-left" />
<FullscreenControl />
<LegendPanel />



        {onHover ? (
			                <Popup
                                  latitude={onHover.location.coordinates[1]}
                                  longitude={onHover.location.coordinates[0]}
                                  anchor="bottom" >
							<h5> {onHover.location_name} Temperature Data</h5>
							{/* <h5>{onHover.date}</h5> */}
							{/* <h4>{onHover.time}</h4> */}
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


