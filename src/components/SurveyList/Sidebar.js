import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faHamburger,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    return (

        <div className="sidebar">
            <ul>
                <li>
                    <FontAwesomeIcon icon={faHouse} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faEnvelope} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faHamburger} />
                </li>
            </ul>
        </div>

    )
}

export default Sidebar
