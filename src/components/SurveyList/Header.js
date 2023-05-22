import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "./Header.css";


function Header() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div>

            <Navbar
                className="navbar  justify-content-between  "
                style={{
                    paddingLeft: "20px",
                    paddingRight: "140px",
                    boxShadow: "0px 0px 10px #00000029",
                }}
            >
                <Nav className="logo">LOGO</Nav>
                <Nav>
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

export default Header;
