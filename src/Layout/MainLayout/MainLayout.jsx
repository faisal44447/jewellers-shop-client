import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <div className='mb-10'>
                <NavBar />
            </div>
            <div className="max-w-7xl mx-auto mt-10 p-4">
                <Outlet />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;