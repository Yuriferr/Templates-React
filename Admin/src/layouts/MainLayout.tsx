import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout(){
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
        <NavBar mark="Yuriferr" />
        <div style={{ flex: 1 }}>
            <Outlet />
        </div>
        </div>
    );
}