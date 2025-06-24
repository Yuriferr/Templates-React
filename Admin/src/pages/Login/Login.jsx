import { useNavigate } from 'react-router-dom';
import Forms from '../../components/Forms/Forms';

export default function Login() {
    const navigate = useNavigate();

    async function handleSubmit(values) {
        try {
            const response = await fetch('https://avaliacoes-api-production-470c.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            });

            if (!response.ok) {
                alert('Usuário ou senha inválidos!');
                return;
            }

            const data = await response.json();
            // Espera-se que a API retorne { token, type, username }
            localStorage.setItem('login', JSON.stringify({
                token: data.token,
                type: data.type,
                username: data.username
            }));
            alert('Login realizado com sucesso!');
            navigate('/');
        } catch (error) {
            alert('Erro ao conectar com o servidor!');
        }
    }

    return (
        <main className='login-container'>
            <Forms
                title="Login"
                fields={[
                    { label: "Usuário", name: "username", type: "text" },
                    { label: "Senha", name: "password", type: "password" }
                ]}
                buttonLabel="Entrar"
                onSubmit={handleSubmit}
            />
        </main>
    );
}