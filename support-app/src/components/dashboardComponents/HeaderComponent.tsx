import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const HeaderComponent = ({user, setUser} : any) => {
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('userId');
        setUser(null);
        router.push('/');
      };

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Panel de Control</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>
  )
}

export default HeaderComponent