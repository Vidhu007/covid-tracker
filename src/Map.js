import React from 'react'
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer , useMap } from 'react-leaflet';
import "./Map.css";
import {showDataOnMap} from './util';

function Map({countries, casesType,center, zoom }) {
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    return (
        <div className="map">
           <MapContainer
           casesType={casesType}
           center={center}
           zoom={zoom} >
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
