import * as React from 'react';
import {useState, useEffect} from 'react';
import {fromJS} from 'immutable';
import MAP_STYLE from '../map-style-basic-v8.json';
import { Container} from 'react-bootstrap'
import LegendPanel from './LegendPanel';

const defaultMapStyle= fromJS(MAP_STYLE);
const defaultLayers = defaultMapStyle.get('layers');

const categories = ['low_September', 'moderate_September', 'severe_September','severe_October','moderate_October','low_October','severe_November','moderate_November','low_November'];

// Layer id patterns by category
const layerSelector = {
  severe_September: /severe_September/,
  moderate_September: /moderate_September/,
  low_September: /low_September/,
  severe_October: /severe_October/,
  moderate_October: /moderate_October/,
  low_October: /low_October/,
  severe_November: /severe_November/,
  moderate_November: /moderate_November/,
  low_November: /low_November/


};

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

function getMapStyle({visibility, color}) {
  const layers = defaultLayers
    .filter(layer => {
      const id = layer.get('id');
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.get('id');
      const type = layer.get('type');
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(['paint', colorClass[type]], color[category]);
      }
      return layer;
    });

  return defaultMapStyle.set('layers', layers);
}

function StyleControls(props) {
  const [visibility, setVisibility] = useState({
    moderate_September: true,
    low_September: true,
    severe_September: true
  });

  const [color, setColor] = useState({
    moderate_September: '#DBE2E6',
    low_September: '#E6EAE9',
    severe_September: '#333333'
  });

  useEffect(() => {
    props.onChange(getMapStyle({visibility, color}));
  }, [visibility, color]);

  const onColorChange = (name, value) => {
    setColor({...color, [name]: value});
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({...visibility, [name]: value});
  };

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
    <>
    <div className="control-panel">
      <h3>Coral Bleaching Indicator</h3>
      <p>For the month of November 2022</p>
    </div>
   <LegendPanel />

    </>
  );
}

export default StyleControls