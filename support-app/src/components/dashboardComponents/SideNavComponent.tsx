import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineFileText, AiOutlineHome, AiOutlineDesktop } from 'react-icons/ai';

interface SideNavComponentProps {
  setController: (controller: string) => void;
}

const SideNavComponent= ({ setController } : SideNavComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="md:hidden p-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Cerrar Menú' : 'Abrir Menú'}
      </button>

      {/* Menú Lateral */}
      <nav className={`absolute md:static bg-white shadow-lg rounded-lg m-4 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <ul className="p-4 space-y-4">
          <li className="flex items-center border-b border-gray-200 pb-2">
            <AiOutlineUser className="text-blue-600 mr-2" />
            <a href="/profile" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300">
              <strong>PERFIL</strong>
            </a>
          </li>
          <li className="flex items-center border-b border-gray-200 pb-2">
            <AiOutlineFileText className="text-blue-600 mr-2" />
            <a 
              className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300 cursor-pointer"
              onClick={() => { setController('incidents'); setIsOpen(false); }}
            >
              <strong>INCIDENCIAS</strong>
            </a>
          </li>
          <li className="flex items-center border-b border-gray-200 pb-2">
            <AiOutlineHome className="text-blue-600 mr-2" />
            <a 
              className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300 cursor-pointer"
              onClick={() => { setController('buildings'); setIsOpen(false); }}
            >
              <strong>EDIFICIOS</strong>
            </a>
          </li>
          <li className="flex items-center border-b border-gray-200 pb-2">
            <AiOutlineDesktop className="text-blue-600 mr-2" />
            <a 
              className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300 cursor-pointer"
              onClick={() => { setController('equipment'); setIsOpen(false); }}
            >
              <strong>EQUIPAMIENTO</strong>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNavComponent;
