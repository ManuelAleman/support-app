import React, {useEffect} from 'react';
import DashboardUser from '@/components/DashboardUser';
import Footer from '@/components/Footer';
import { useUser } from './../utils/UserContext';
import "./../app/globals.css";
import { useRouter } from 'next/navigation';
interface UserProp{
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string,
  rating: number,
}

interface UserContextType {
  user: UserProp | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const DashboardPage: React.FC = () => {
  const { user, setUser, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
  if(loading) return;
  console.log(user)
  if (!user) {
      router.push('/LogInPage');
    }
  },[loading, user]
  );

  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      user && (
        <div> 
          <DashboardUser user={user} setUser={setUser} /> 
          <Footer />
        </div>
      )
    )
  );
  
  
}

export default DashboardPage;
