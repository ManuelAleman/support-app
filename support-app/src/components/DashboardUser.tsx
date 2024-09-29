import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import IncidentsOpen from './IncidentsOpen';
import { useUser } from './../utils/UserContext';

const DashboardUser = ({user, setUser} : any) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userId');

    setUser(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Panel de Control</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <nav className="w-64 bg-white shadow-lg">
          <ul className="p-4">
            <li className="mb-2">
              <Link href="/Users" className="text-blue-600 hover:underline">
                Mi Perfil
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/AdminPanelPage" className="text-blue-600 hover:underline">
                Panel de Administración
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4 text-black">Bienvenido {user.name}</h2>
          <p className="mb-4 text-black">Aquí puedes gestionar todas las funcionalidades del sistema.</p>
          <Link href="/AdminPanelPage" className="text-blue-600 hover:underline text-lg">
            Ir al Panel de Administración
          </Link>
            <IncidentsOpen />
        </main>
      </div>
    </div>
  );
}

export default DashboardUser;
