
import './App.css';
import { MenuItem, Select , FormControl, Card, CardContent } from '@material-ui/core';
import React ,{ useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData , prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  // to store country name and code for all countries
  const [countries,setCountries] = useState([]);

  // jo bhi country select kare user
  const [country,setCountry] = useState('worldwide');

  // All the covid info and sab info about the selectd country
  const [countryInfo, setCountryInfo] = useState({});

  //All the covid info and sab info about all the countries table mein as a prop send karne ke liye
  const [tableData ,setTableData]= useState([]);

  const [mapCenter, setMapCenter]=useState({lat: 20.5937, lng: 78.9629 })

  const [mapZoom, setMapZoom] = useState(3)

  const [mapCountries, setMapCountries]=useState([])

  const [casesType, setCasesType] = useState("cases")
  // https://disease.sh/v3/covid-19/countries
  // useEffect runs code based on a condition

  //initially to fetch data for worldwide
  useEffect(()=>{
    const url ="https://disease.sh/v3/covid-19/all" 
    
     fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      // initially the country="worlwide"
      setCountryInfo(data);
    });
    
  },[])

  // Initially ...BAs ek baar use karna hai to get info aabout country name and code
  // and baaki saara data table ko send karna hai
  useEffect(()=>{
    // async send for req, & wait for it to come then only proceed
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=> (
          { name: country.country,  // Eg India    (country name)
            value: country.countryInfo.iso2     // Eg IN (country code)
          }
        ))
        
        setCountries(countries)
        // data mein saara data hai so we 'll send this to the table
        // now we need the countries in decreasing order of the covid cases
        // so we'll implement a sorted function and then pass the data through it to the table
        let sortedData = sortData(data);
        setTableData(sortedData);

        /*  map ko bhi saari countries ka data chahiye*/
        setMapCountries(data);
      })
    } 
    // wait for the url to send data so fetch se pehle await and ".then" means jab data aajye then uss response 
    // ko json mein convert karke return 
    //.then firse means jab vo json data aaye then map through each object of that data
    // and return an object having name and value
    
    // to implement the function
    getCountriesData();
    
  },[]);

  const onCountryChange = async (event)=>{
      const countryCode = event.target.value;
      // console.log(countryCode);
      

      const url = countryCode==="worldwide" ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}` ;

      // https://disease.sh/v3/covid-19/countries/{COUNTRY__CODE}
      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
         // response json mein aayega about each country ,,,let that be "data"
        setCountry(countryCode);
        setCountryInfo(data);
        
        // response json mein aayega about each country ,,,let that be "data"
        countryCode === "worldwide" 
        ? setMapCenter([34.80746, -40.4796])
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        // worldwide select karne se error aara tha so humne alag se likh diya to remove the error
        countryCode === "worldwide"
        ? setMapZoom(3)
        : setMapZoom(4);
        //setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
        //setMapZoom(4);
      });
      
  };
  // console.log(countryInfo);
  return (
    <div className="app">
  
  {/* 2 div banalo ek app__left and ek app__right*/}
   <div className="app__left">
     
      {/* Header*/}
      <div className="app__header">
     <h1>Covid Tracker </h1>
     {/* Title + droppdown*/}

     {/* material ui se dropdown*/}
     <FormControl className="app__dropdown">
       <Select variant="outlined" value={country} onChange={onCountryChange}>
       <MenuItem value="worldwide">Worldwide</MenuItem>
         {/* Loop through all countries and show dropdown*/}
         {countries.map((country)=> (
           <MenuItem value={country.value} >{country.name}</MenuItem>
           // har country ko display karna hai in dropdown
           // value is country code and display country name hoga
         ))}
      
       </Select>
     </FormControl>
     </div>

<div className="app__stats">

  {/* Components ko className , onClick ye sab dena is thoda different see the code*/}
     <InfoBox 
     active={casesType==="cases"} 
     title="Covid cases" 
     isRed

     /* prettyPrintStat bade bade numbers ko standard form mein pretty way se display kardega 
    Eg 524000 ko 5.24 K */ 
     cases={prettyPrintStat(countryInfo.todayCases)}
      total={prettyPrintStat(countryInfo.cases)}
       onClick={e=> setCasesType("cases")}  />
     <InfoBox 
     active={casesType==="recovered"}
      title="Recovered" 
      cases={prettyPrintStat(countryInfo.todayRecovered)} 
      total={prettyPrintStat(countryInfo.recovered)} 
      onClick={e=> setCasesType("recovered")}  />
     <InfoBox 
     active={casesType==="deaths"}
      title="Deaths"
      isRed
       cases={prettyPrintStat(countryInfo.todayDeaths)}
        total={prettyPrintStat(countryInfo.deaths)} 
        onClick={e=> setCasesType("deaths")}  />
     {/* Info box*/}
     {/* Info box*/}
     {/* Info box*/}
</div>
  
     <Map casesType={casesType}  countries={mapCountries} center={mapCenter} zoom={mapZoom} />
     {/* Map*/}
    </div>
   
   <Card className="app__right">
    <CardContent>
    <div className="app__information">
    {/* Table*/}
    <h3>Live cases by Country</h3>
    <Table countries = {tableData} />
    
    <h3>Worldwide new {casesType}</h3>
    {/* Graph*/}
    <LineGraph casesType={casesType}/>
    </div>
    </CardContent>
   </Card>


   </div>
  
  );
}

export default App;
