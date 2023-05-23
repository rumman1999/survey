import React from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "./Navigation.css";


function Navigation() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.clear()
        navigate("/");
    }
    return (
        <div>

            <Navbar id="navbar"
                className="justify-content-between  "
                style={{
                    paddingLeft: "20px",
                    paddingRight: "140px",
                    boxShadow: "0px 0px 10px #00000029",
                }}
            >
                <Nav className="logo">LOGO</Nav>
                <Nav>
                <Nav className="logo">logout</Nav>
                    <NavDropdown>
                        <NavDropdown.Item
                            className="custom-dropdown"
                            style={{ padding: "5px", minWidth: "20px" }}
                            onClick={handleLogout}
                        >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Navigation;
