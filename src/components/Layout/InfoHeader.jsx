import React from 'react'
import classes from "./InfoHeader.module.css"
function InfoHeader({title}) {
  return (
   <h2 className={classes["header-title"]}>{title}</h2>
  )
}

export default InfoHeader