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

import ControlPanel from '../components/map-components/ControlPanel';

import { listStores } from '../actions/storeActions';
// import { STORE_CREATE_RESET } from '../constants/storeConstants';

import {listCorals} from '../actions/coralActions';



const pointLayer = {
	id: 'point',
	type: 'circle',
	paint: {
	  'circle-radius': 10,
	  'circle-color': '#007cbf'
	}
  };

 
  function pointOnCircle({center, angle, radius}) {
	return {
	  type: 'Point',
	  coordinates: [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius]
	};
  }

function MapScreen({ history, match }) {

	const [pointData, setPointData] = useState(null);
	useEffect(() => {
		const animation = window.requestAnimationFrame(() =>
		  setPointData(pointOnCircle({center: [-100, 0], angle: Date.now() / 1000, radius: 20}))
		);
		return () => window.cancelAnimationFrame(animation);
	  });
	

	const [ viewport, setViewport ] = useState({
		latitude: -6.664096057765138,
		longitude: 147.84095764160156,
		width: '100vw',
		height: '100vh',
		zoom: 12.62
	});
	const [ geomorphicData, setGeomorphicData ] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get('../geomorphic.geojson');
			//console.log(data)
			setGeomorphicData(data);
		};

		getData();
	}, []);


	//trial

	const [ geojsonData, setGeojsonData ] = useState([]);

	useEffect(() => {
		const getGeojson = async () => {
			const { data } = await axios.get('../geojson/geo.geojson');
			console.log('Polygon data',data)
			setGeojsonData(data);
		};

		getGeojson();
	}, []);

 //bleached data
	const [ bleachData, setBleachData ] = useState([]);




	useEffect(() => {
		const getBleachData = async () => {
			const { data } = await axios.get('../geojson/bleached_180722_4326.geojson');
			
			setBleachData(data);
		};

		getBleachData();
	}, []);
	const [ bleach22Data, setBleach22Data ] = useState([]);
	useEffect(() => {
		const getBleach22Data = async () => {
			const { data } = await axios.get('../geojson/bleached_220722_4326.geojson');
			//console.log(data)
			setBleach22Data(data);
		};

		getBleach22Data();
	}, []);

	 //bleached data
	 const [ bleach2Data, setBleach2Data ] = useState([]);

	 useEffect(() => {
		 const getBleach2Data = async () => {
			 const { data } = await axios.get('../geojson/bleached_030722_4326.geojson');
			 //console.log(data)
			 setBleach2Data(data);
		 };
 
		 getBleach2Data();
	 }, []);
 

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const storeList = useSelector((state) => state.storeList);
	const { loading, error, stores, page, pages } = storeList;

	//coral stuff
	const coralList = useSelector((state) => state.coralList);
	const { loadingCoral, errorCoral, corals, pageCoral, pagesCoral } = coralList;

	


	useEffect(
		() => {
			dispatch(listCorals());
			
	
		},
		[ dispatch ]
	);


	useEffect(
		() => {
			dispatch(listStores());
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


	const b2Layer:FillLayer={
		id:"b2",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#111111',
			'fill-color': '#6e599f',
			'fill-opacity': 0.75
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
	const coralLayer:FillLayer={
		id:"route",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#009988',  //ff0000
			'fill-color': '#6effaa',
			'fill-opacity': 0.75
		}
	}

	const jsonCoralLayer:FillLayer={
		id:"jsonCoral",
		type:"fill",
		source:"route",
		paint:{
			'fill-outline-color': '#008899',  //ff0000
			'fill-color': '#222222',
			'fill-opacity': 0.75
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
		// paint:{
		// 	'line-color': '#880088'
		// }
	}

	
  const submitHandle = (e) => {
    e.preventDefault()
    
  }

	return (
		<div className="">
			<LinkContainer to="/store">
				<Nav.Link>
					<i className="fas fa-shopping-cart" /> Add Store
				</Nav.Link>
			</LinkContainer>
			<LinkContainer to="/temperature">
				<Nav.Link>
					<i className="fas fa-shopping-cart" /> Add Temperature
				</Nav.Link>
			</LinkContainer>
			<LinkContainer to="/geo">
				<Nav.Link>
					<i className="fas fa-shopping-cart" /> Add Coral GeoJSON Data
				</Nav.Link>
			</LinkContainer>
			<ReactMapGL
				initialViewState={{ ...viewport }}
				mapboxAccessToken="pk.eyJ1IjoiYW5hcGl0YWxhaSIsImEiOiJjbDdlYzRjNjQwOXUxM3dwbGNxd3V5bDN3In0.QsuXMK_1u4kBZEht5QaO3w"
				style={{ width: 1000, height: 1000 }}
				mapStyle="mapbox://styles/anapitalai/cl8dw9b8f000d14rtgqhu1exx"
			
				onViewportChange={(viewport) => {
					setViewport(viewport);
				}}
			>


				{loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :(<>{stores.map(s => (

					<Marker key={s.storeId} latitude={s.location.coordinates[1]} longitude={s.location.coordinates[0]}>
						<button onClick={
							e=>{
								e.preventDefault()
								//setSelectedPoint(s)
								console.log('Clicked')
							}
						}><img className='marker' src="/a.png" /></button>
					</Marker>
				 
				))}</>)}

{/* {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :(<>{corals.map((coral) => {

<Source  id="b" type="geojson" data={coral} >
				<Layer {...jsonCoralLayer} />
				</Source> 


})}</>)} */}

{/* data.corals[0].features[0].properties.coralId) */}
	{/* <Row>
            {corals.map((coral) => (
    <Source key={coral.features[0].properties.coralId}  id="b3" type="geojson" data={corals[0]} >
	<Layer  {...jsonCoralLayer} />
	</Source> 
            ))}
          </Row>


		  <Row>
            {corals.map((coral) => (
    <Source key={coral.features[0].properties.coralId}  id="" type="geojson" data={corals[1]} >
	<Layer  {...coralLayer} />
	</Source> 
            ))}
          </Row>

		  <Row>
            {corals.map((coral) => (
    <Source key={coral.features[0].properties.coralId}  id="" type="geojson" data={corals[2]} >
	<Layer  {...b2Layer} />
	</Source> 
            ))}
          </Row> */}


{/* 
             <Source id="route" type="geojson" data={bleachData} >
				<Layer {...coralLayer} />
				</Source> 
				<Source id="b22" type="geojson" data={bleach22Data} >
				<Layer {...b22Layer} />
				</Source> 

				<Source id="geom" type="geojson" data={geomorphicData} >
				<Layer {...geomLayer} />
				</Source>*/}
 
				<Source id="b2" type="geojson" data={corals[0]} >
				<Layer {...b2Layer} />
				</Source> 
				<Source id="b22" type="geojson" data={corals[1]} >
				<Layer {...b22Layer} />
				</Source> 
				<Source id="b23" type="geojson" data={corals[2]} >
				<Layer {...b22Layer} />
				</Source> 

				{pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>


        )}

<NavigationControl position="top-left" />
<FullscreenControl />

			</ReactMapGL>

			<ControlPanel  />
			
		</div>
	);
}
export default MapScreen;
