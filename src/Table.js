import React from 'react'
import './Table.css'
import numeral from "numeral";
// props arguement ki jagah destructure karke {countries } kar sakte hai instead of props.countries
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,cases})=>(
                <tr>
                <td>{country} </td>
                <td><strong>{numeral(cases).format("0,0")}</strong> </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
