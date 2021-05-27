import { Card , CardContent , Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css";


function InfoBox({title, active,cases,isRed,total, ...props}) {
    /* ...props se remaining props aajynge agar koi hai title, active,cases,isRed,total ke AALAAVA
    jo ki hai we had one more prop i.e onClick 
    
    Aise hi components mein className, onClick jaise cheezein ke liye ye karte hain*/
    return (

        // standard material ui for card hai
        // Card lo fir card content for content fir typography for text
       <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}>
       <CardContent>
           <Typography className="infoBox__title" color="textSecondary">
               {/* Title*/}
              {title} 
           </Typography>
           <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
           {/* No of cases*/}
           {cases}
           </h2>
           <Typography className="infoBox__total" color="textSecondary">
            
               {total} Total
           </Typography>
           {/* total cases*/}
       </CardContent>
       </Card>
    )
}

export default InfoBox
