import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import { Map } from 'react-map-gl'
import DATA from './address.json'
import 'mapbox-gl/dist/mapbox-gl.css';

const ACCESS_TOKEN = 'pk.eyJ1IjoiYm9zaGFvMTMiLCJhIjoiY2xkMTgya2JhMXZkYTNudDdrYTQ1M25kdSJ9.DsCvNLZe6sZ1-zId4C-eIA'
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const GOOGLE_MAPS_KEY = 'AIzaSyAioaBzcUMBv_L3lsd9CoFbz4Gw-Xv-IhY'

const INITIAL_VIEW_STATE = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 2,
  bearing: -10,
  pitch: 20
};

const Title = styled('div')({
  position: 'absolute',
  top: '80px',
  left: '155px'
})
function Map1() {

  const onClick =info => {
    if(info.object) {
      console.log(info.object.properties.Name)
    }
  }
  const layers = [
    new GeoJsonLayer({
      id: 'people',
      data: DATA,
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusScale: 1,
      getPointRadius: f => 5,
      getFillColor: [86, 144, 58, 250],
      pickable: true,
      autoHighlight: true,
      onClick
    })
  ]
  return (
    <>

     <DeckGL
     initialViewState={INITIAL_VIEW_STATE}
     controller={true}
     layers={layers}>
       <Title>TECH MAP</Title>
      <Map mapStyle={MAP_STYLE} mapboxAccessToken={ACCESS_TOKEN}/>
     </DeckGL>
    </>
  )
}

export default Map1;