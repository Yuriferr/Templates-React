import { useNavigate } from 'react-router-dom';
import Forms from '../../components/Forms/Forms';

export default function Login() {
    const navigate = useNavigate();

    function handleSubmit(values) { // Removida a anotação de tipo
        localStorage.setItem('login', JSON.stringify(values));
        alert('Login salvo no cache!');
        navigate('/');
    }

    return (
        <main className='login-container'>
            <Forms
                title="Login"
                fields={[
                    { label: "Email", name: "email", type: "text" },
                    { label: "Senha", name: "password", type: "password" }
                ]}
                buttonLabel="Entrar"
                onSubmit={handleSubmit}
            />
        </main>
    );
}