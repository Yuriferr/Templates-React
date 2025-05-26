import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableList from '../../components/TableList/TableList';

export default function ListPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (!login) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <main className='list-container'>
            <TableList />
        </main>
    );
}