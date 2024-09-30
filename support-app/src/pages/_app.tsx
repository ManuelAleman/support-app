import { UserProvider } from './../utils/UserContext';
import Footer from '@/components/Footer';
function MyApp({ Component, pageProps } : any) {
    return (
        <UserProvider>
            <Component {...pageProps} />
            <Footer />
        </UserProvider>
    );
}

export default MyApp;
