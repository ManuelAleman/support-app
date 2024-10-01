import React, { useEffect } from 'react';
import { useUser } from '../../utils/UserContext';
import { useRouter } from 'next/navigation';
const DashboardSupport = ({ user, setUser } : any) => {
    const router = useRouter();
    return (
        <p>Bienvenido {user.name}</p>
    );
};

export default DashboardSupport;
