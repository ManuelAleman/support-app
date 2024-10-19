import { UserProvider } from './../utils/UserContext';
import Footer from '@/components/Footer';
import { useUser } from './../utils/UserContext';
import LoadingPage from './LoadingPage';

function MyApp({ Component, pageProps } : any) {
    const { user, setUser, loading } = useUser();

    return (
        <UserProvider>
            <Component {...pageProps} />
            {!loading && <Footer />}
        </UserProvider>
    );
}

export default MyApp;