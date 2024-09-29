import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_API } from './CONSTANTS';
import Cookies from 'js-cookie';
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

const UserContext = createContext<UserContextType> ({} as UserContextType);

export const UserProvider = ({ children } : any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            }
            setLoading(false);
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