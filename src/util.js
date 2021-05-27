

import numeral from 'numeral';
import React from 'react';
import {Circle, Popup} from 'react-leaflet';
// import numerical from 'numerical';

const casesTypeColors = {
    cases: {
      option: { color:"#cc1034", fillColor: "#cc1034" },
     //hex: "#CC1034",
      //rgb: "rgb(204, 16, 52)",
      //half_op: "rgba(204, 16, 52, 0.5)",
      /* size of circle */
      multiplier: 800
    },
    recovered: {
      option: { color:"#7dd71d", fillColor: "#7dd71d" },
      // hex: "#7dd71d",
      //rgb: "rgb(125, 215, 29)",
      //half_op: "rgba(125, 215, 29, 0.5)",
      /* size of circle */
      multiplier: 1200,
    },
    deaths: {
      option: { color:"#ff6c47", fillColor: "#ff6c47" },
      // hex: "#fb4443",
      //rgb: "rgb(251, 68, 67)",
     // half_op: "rgba(251, 68, 67, 0.5)",
      /* size of circle */
      multiplier: 2000,
    },
  };
  /*  har casetype ke liye we want to show circle of diff size on the map
  so multiplayer rakhliya for that and randomly values dedi sabko according to
  kise sabse bada and kise sabse chota dikhana hai circle se */

  /*Leaflet keeps changing its documentaiona and does not tell
  pehle hex, rgb sab aise pass karte the but now "pathOptions" ka ek prop pass karna hai 
  and usme daalna hai sab */

  export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
/* this is to format the numerical library Eg 5400453 will become 5400.5 k */

// sorting function to sort countries in decreasing order of the covid cases

/* data arguement bahut bada object hai containing all the info
about all the countries and uss saare objects mein ek parameter hai "cases:
see their api for json for more clearity
so hum har object.cases ko copare karenge in descending order*/

export const sortData  =(data) =>{

    // just copying all the data into an array
    // ... se sara "data" copy hojayga
    // else sortedData=[data] se ek array ban jeayga bas of "data" length jo ki nahi karna hume 
    const sortedData = [...data];
    
    sortedData.sort((a,b)=>{
        if(a.cases > b.cases)
        return -1;
        else return 1;
    });
    return sortedData;
}

// draw circles on map 
export const showDataOnMap = (data, casesType='cases')=>
     
     data.map(country=> (
         <Circle

         /*  see the docs of circle*/

         center={[country.countryInfo.lat,country.countryInfo.long] }
         fillOpacity={0.4}
         pathOptions={casesTypeColors[casesType].option}
         //color={casesTypeColors[casesType].hex}
         // fillColor={casesTypeColors[casesType].hex}
         radius={
            Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier
          }
         >
             <Popup>
             {/*  Popup ek component hai react-leaflet ka jo jab graph pe touch kare toh kuch  pop karde*/}
                 <div className="info-container">
                     <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}} />

                     {/*  yaha flag pehle display nahi horaha tha because material ui 
                     uski height ko zero kar raha tha so humne css mein height dedi flag ko*/}
                     <div className="info-name"> {country.country}</div>
                     <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                     <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                     <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>

                 </div>
             </Popup>
         </Circle>
     )
);