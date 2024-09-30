"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_API } from './CONSTANTS';
import Cookies from 'js-cookie';

interface UserProp {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    rating: number;
}

const UserContext = createContext<{
    user: UserProp | null;
    setUser: React.Dispatch<React.SetStateAction<UserProp | null>>;
    loading: boolean;
}>({
    user: null,
    setUser: () => {},
    loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProp | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("UserProvider mounted or updated");

        const fetchUser = async () => {
            const token = Cookies.get('authToken');
           
            if (token) {
                try {
                    const response = await axios.get(URL_API + "/user/getMyUser", {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
       
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);