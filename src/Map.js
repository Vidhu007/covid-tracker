import React from 'react'
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer , useMap } from 'react-leaflet';
import "./Map.css";
import {showDataOnMap} from './util';

{/* Ye file bahut sahi hai sambhal ke rakhna
kabhi bhi map display karna ho use this file*/}
function Map({countries, casesType,center, zoom }) {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    return (

        // Mapcontainer, ChangeView sabke baar mein padlena aise hi use karte hain
        <div className="map">
           <MapContainer
           casesType={casesType}
           center={center}
           zoom={zoom} >
        
        {/* ChangeView mein center aur zoom pass karte hain */}
       <ChangeView center={center} zoom={zoom} />

                {/* Ye karna hi karna hai titlelayer mein see their documentaion*/}
            <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
      {showDataOnMap(countries,casesType)}
  </MapContainer>
        </div>
    );
}

export default Map;
