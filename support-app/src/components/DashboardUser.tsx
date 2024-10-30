import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import IncidentsOpen from './dashboardComponents/IncidentsOpen';
import HeaderComponent from './dashboardComponents/HeaderComponent';
import SideNavComponent from './dashboardComponents/SideNavComponent';
import BuildingsComponent from './dashboardComponents/BuildingsComponent';
import EquipmentComponent from './dashboardComponents/EquipmentComponent';
import UserMagementComponent from './dashboardComponents/UserManagementComponent';
const DashboardUser = ({user, setUser} : any) => {
  const [controller, setController] = useState('incidents');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderComponent user={user} setUser={setUser} />
      <div className="flex flex-1 flex-col md:flex-row">
        <SideNavComponent setController={setController} user={user} />
        <main className="flex-1 p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-4 text-black px-4 md:px-8">Bienvenido {user.name}</h2>
          <p className="mb-4 text-black px-4 md:px-8">Aquí puedes gestionar todas las funcionalidades del sistema.</p>
          {controller === 'incidents' && <IncidentsOpen user={user} />}
          {controller === 'buildings' && <BuildingsComponent />}
          {controller === 'equipment' && <EquipmentComponent />}
          {controller === 'userManagement' && <UserMagementComponent />}
        </main>
      </div>
    </div>
  );
}

export default DashboardUser;
