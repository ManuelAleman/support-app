"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogInPage from '@/pages/LogInPage';
import "./globals.css";


export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      router.push('/DashboardPage');
    }
    setLoading(false); 
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {!isLoggedIn && <LogInPage />}
    </div>
  );
}
