import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import { Map } from 'react-map-gl'
import * as API from '../../API.js'
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
  left: '130px',
  fontFamily: `'Courgette', cursive`,
  fontSize: 'x-large'
})

var mapFeatureObj = {
  "type": "Feature",
  "id": 0,
  "properties": {
    "Name": "Susan IPHONE XR1",
    "device": "iphone"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      -71.13112956925647,
      42.32550867371509
    ]
  }
};

// var mapDataTemplate = {
//   "type": "FeatureCollection",
//     "features": []
// }

function Map1() {
  const [allUsers, setAllUsers] = useState([]);
  const [mapData, setMapData] = useState({
    "type": "FeatureCollection",
      "features": []
  });

  React.useEffect(() => { //gets and sets allUsers on mount
    API.getAllUsers()
    .then(res => {
      setAllUsers(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }, [])

  React.useEffect(() => { //triggers fillMap func
    if(allUsers.length) {
      fillMapDataWithUsersLocations();
    }
  }, [allUsers]);

  React.useEffect(() => { //triggers fillMap func
    console.log('mapData: ', mapData);
  }, [mapData]);



  const fillMapDataWithUsersLocations = () => {
    var tempFeatures = [];

    allUsers.forEach((user, i) => {
      var objFeature = {};
      Object.assign(objFeature, mapFeatureObj);

      var street = user.street;
      var zip = user.zip_code;
      var tempCoords = convertAddyToCoords(street, zip);
      //set coords into array tempCoords [lat, long]
      //construct obj to push into tempFeatures arr
      objFeature.id = i;
      objFeature.properties = {Name: user.name, Devices: []}; //add in devices?
      tempFeatures.push(objFeature);
      //
    });//forEach ends
    var newMapDataObj = {};
    Object.assign(newMapDataObj, mapData);
    newMapDataObj.features = tempFeatures;
    setMapData(newMapDataObj);

  };//END fillMap FUNC

  const convertAddyToCoords = (street, zip) => {
    //do conversion

    return [72.3842, 83.18942]; //obj change these
  }



  const onClick =info => { // Go to Item Details, etc
    if(info.object) {
      console.log(info.object.properties.Name)
    }
  }
  const layers = [
    new GeoJsonLayer({
      id: 'people',
      data: mapData, //.json
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
       <Title>find an item</Title>
      <Map mapStyle={MAP_STYLE} mapboxAccessToken={ACCESS_TOKEN}/>
     </DeckGL>
    </>
  )
}

export default Map1;