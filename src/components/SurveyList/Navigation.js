import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa'; // Added FaTimes for close button
import { FaHouse } from "react-icons/fa6";
import logo from "../../utils/SurveyLogo.jpg"

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    const navigateToHomePage = () => {
        navigate('/');
        setIsMenuOpen(false); // Close the menu on navigation
    };

    const navigateToSurveyItems = () => {
        navigate('/surveyitems');
        setIsMenuOpen(false); // Close the menu on navigation
    };

    return (
        <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md">
            {/* Logo Section */}
            <div className="text-xl font-bold text-gray-800 flex-shrink-0 w-10">
                <img src={logo} alt="" style={{width:"100", height:"100%"}}/>
            </div>

            {/* Hamburger Menu Button */}
            <button 
                className="lg:hidden flex items-center text-gray-800 focus:outline-none"
                onClick={toggleMenu}
            >
                <FaBars size={24} />
            </button>

            {/* Right Section: Logout */}
            <div className={`flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
                <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-800 hover:text-gray-600"
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-0 right-0 w-2/3 bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'} transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} h-full`}>
                <div className="flex flex-col p-4">
                    {/* Close Button */}
                    <button 
                        onClick={toggleMenu}
                        className="self-end text-gray-800 hover:text-gray-600 mb-4"
                    >
                        <FaTimes size={24} />
                    </button>
                    
                    {/* Navigation Links */}
                    <button 
                        onClick={navigateToHomePage}
                        className="flex items-center text-gray-800 hover:text-gray-600 mb-4"
                    >
                        <FaHouse className="mr-2" />
                        Home
                    </button>
                    <button 
                        onClick={navigateToSurveyItems}
                        className="flex items-center text-gray-800 hover:text-gray-600 mb-4"
                    >
                        <FaEnvelope className="mr-2" />
                        Survey Items
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center text-gray-800 hover:text-gray-600"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
