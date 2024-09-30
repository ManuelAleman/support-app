"use client"
import React, {useEffect} from 'react';
import DashboardUser from '@/components/DashboardUser';
import Footer from '@/components/Footer';
import { useUser } from './../utils/UserContext';
import "./../app/globals.css";
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/utils/LoadingComponent';
const DashboardPage = () => {
  const { user, setUser, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
  if(loading) return;
  if (!user) {
      router.push('/LogInPage');
    }
  },[loading, user]
  );

  return (
    <LoadingComponent/>
    // loading ? (
    //   <LoadingComponent />
    // ) : (
    //   user && (
    //     <div> 
    //       <DashboardUser user={user} setUser={setUser} /> 
    //     </div>
    //   )
    // )
  );
  
  
}

export default DashboardPage;
