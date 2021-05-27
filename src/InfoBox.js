import { Card , CardContent , Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css";


function InfoBox({title, active,cases,isRed,total, ...props}) {
    /* ...props se remaining props aajynge agar koi hai
    jo ki hai we had one more prop i.e onClick */
    return (
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
