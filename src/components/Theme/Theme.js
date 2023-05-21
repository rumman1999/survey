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
        <>
            <button className="theme-btn" onClick={handleClickOpen}>Theme Setting</button>
            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <h3>Theme Setting</h3>
                                <h3 class="cursor-pointer" onClick={closePopup}>x</h3>
                            </div>
                            <ThemeForm closePopup={closePopup}/>
                        </div>
                    </div>:""
                }
            </div>
        </>
    )
}
export default Theme;