import React, { useState }  from "react";
import './theme.css'
import ThemeForm from "./ThemeForm";
 
function Theme(){
    const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }
  
    return(
        <div className="popup">
                {
                    popup?
                            <ThemeForm closePopup={closePopup}/>:""
                }
        </div>
    )
}
export default Theme;