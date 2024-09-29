import React, { useEffect, useState } from 'react';
import DepartmentCard from './cards/DepartmentCard';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface BuildingProps {
  _id: string;
  name: string;
}

const DashboardMain = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [buildings, setBuildings] = useState<BuildingProps[]>([]);

  useEffect(() => {
    const userId = Cookies.get('userId');
    const token = Cookies.get('authToken');
    
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/department/getByUser?id=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setName(data.userName);
          setBuildings(data.data);
        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (userId && token) {
      fetchDepartmentData();
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userId');
    router.push('/'); 
  };

  return (
    <div className="w-full h-screen p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">{name || 'Nombre no disponible'}</h1>
      <h2 className="mt-4 text-lg text-gray-600">Mis edificios</h2>
      <ul className="mt-2">
        {buildings.length === 0 ? (
          <li className="text-gray-600">No hay edificios disponibles</li>
        ) : (
          buildings.map((building) => (
            <li key={building._id}>
              <DepartmentCard nombre={building.name} />
            </li>
          ))
        )}
      </ul>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardMain;
