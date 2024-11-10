import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import IncidentsOpen from './dashboardComponents/IncidentsOpen';
import HeaderComponent from './dashboardComponents/HeaderComponent';
import SideNavComponent from './dashboardComponents/SideNavComponent';
import BuildingsComponent from './dashboardComponents/BuildingsComponent';
import EquipmentComponent from './dashboardComponents/EquipmentComponent';
import UserMagementComponent from './dashboardComponents/UserManagementComponent';
import IncidentManagerComponent from './dashboardComponents/IncidentManagerComponent';
const DashboardUser = ({user, setUser} : any) => {
  const [controller, setController] = useState('incidents');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderComponent user={user} setUser={setUser} />
      <div className="flex flex-1 flex-col md:flex-row">
        <SideNavComponent setController={setController} user={user} />
        <main className="flex-1 p-4 md:p-8">
          {controller === 'incidents' && <IncidentsOpen user={user} />}
          {controller === 'buildings' && <BuildingsComponent />}
          {controller === 'equipment' && <EquipmentComponent />}
          {controller === 'userManagement' && <UserMagementComponent />}
          {controller === 'incidentManager' && <IncidentManagerComponent />}
        </main>
      </div>
    </div>
  );
}

export default DashboardUser;
