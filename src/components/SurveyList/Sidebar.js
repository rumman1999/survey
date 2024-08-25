import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHamburger, faHouse } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';

function Sidebar() {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/');
  };

  const navigateToSurveyItems = () => {
    navigate('/surveyitems');
  };

  return (
    <motion.div
      className="w-16 h-full bg-gray-200 text-white flex flex-col items-center py-4 shadow-md hidden lg:flex"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <ul className="space-y-4">
        <li
          className="cursor-pointer bg-gray-700 p-3 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={navigateToHomePage}
        >
          <FontAwesomeIcon icon={faHouse} size="lg" className='text-white'/>
        </li>
        <li className="cursor-pointer bg-gray-700 p-3 rounded-full text-white transition-transform transform hover:scale-110">
          <FontAwesomeIcon icon={faEnvelope} size="lg" className='text-white'/>
        </li>
        <li
          className="cursor-pointer bg-gray-700 p-3 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={navigateToSurveyItems}
        >
          <FontAwesomeIcon icon={faHamburger} size="lg" className='text-white'/>
        </li>
      </ul>
    </motion.div>
  );
}

export default Sidebar;
