import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import numeral from "numeral";


// https://disease.sh/v3/covid-19/historical/all?lastdays=120   
/* ye options likhne hi likhne hai so dont get saared ...its in the docs*/

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  /* 2 arguements lega data of all the country and casesType(cases/recoveries/deaths) and default mein cases honge */

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;


/* api mein har din tak ke total cases dikha raha tha but we want only har din ke new cases
so hum subtract kar rahe hai 
this was tough*/
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };



function LineGraph({casesType="cases"}) {

  /* hum props ki jagah aise destructure karke bhi le sakte hai arguements
  in this case hume casesType chahiye */
    const [data,setData] = useState({});   

  
/* jab bhi casesType change honge and initially too we'll call usestate function to update the chart*/
    useEffect(() => {
      const fetchData = async () => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
          .then((response) => response.json())
          .then((data) => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
          });
      };
  
      fetchData();
    }, [casesType]);

    return (
        <div>
           {/* optional chaining......if data.length nahi toh it does not panicks and returns the data undefined
           data.length se koi errro na aye so we use this*/} 
            {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: "Covid",
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
           
        </div>
    )
}

export default LineGraph;
