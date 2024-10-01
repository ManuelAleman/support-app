import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import IncidentsOpen from './dashboardComponents/IncidentsOpen';
import HeaderComponent from './dashboardComponents/HeaderComponent';
import SideNavComponent from './dashboardComponents/SideNavComponent';
import BuildingsComponent from './dashboardComponents/BuildingsComponent';
import EquipmentComponent from './dashboardComponents/EquipmentComponent';
const DashboardUser = ({user, setUser} : any) => {
  const [controller, setController] = useState('incidents');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderComponent user={user} setUser={setUser} />
      <div className="flex flex-1 flex-col md:flex-row">
        <SideNavComponent setController={setController} />
        <main className="flex-1 p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-4 text-black px-4 md:px-8">Bienvenido {user.name}</h2>
          <p className="mb-4 text-black px-4 md:px-8">Aquí puedes gestionar todas las funcionalidades del sistema.</p>
          <Link href="/AdminPanelPage" className="text-blue-600 hover:underline text-lg px-4 md:px-8">
            Ir al Panel de Administración
          </Link>
          {controller === 'incidents' && <IncidentsOpen />}
          {controller === 'buildings' && <BuildingsComponent />}
          {controller === 'equipment' && <EquipmentComponent />}
        </main>
      </div>
    </div>
  );
}

export default DashboardUser;
