"use client"
import React, { useEffect } from 'react';
import { useUser } from '../utils/UserContext';
import { useRouter } from 'next/navigation';
import DashboardSupport from '@/components/DashboardSupport';
import Footer from '@/components/Footer';
import './../app/globals.css';

const AdminPanelPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("User:", user);
    if (loading) return;
  
    if (!user) {
      router.push('/LogInPage');
    }
  }, [loading, user]);

  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      user && (
        <div>
          <DashboardSupport user={user} />

        </div>
      )
    )
  );
};

export default AdminPanelPage;
