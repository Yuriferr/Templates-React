import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardComponent from '../../components/Dashboard/Dashboard.js'; // Renomeado para evitar conflito de nome

export default function DashboardPage() {
    const [resumo, setResumo] = useState(null); // Inicializa como null para checar se já carregou
    const [ranking, setRanking] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_URL = process.env.REACT_APP_API_URL;

        if (!API_URL) {
            console.error("REACT_APP_API_URL não está definida nas variáveis de ambiente.");
            setError("Configuração de API ausente.");
            setLoading(false);
            return;
        }

        const fetchAllDashboardData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [resumoRes, rankingRes, avaliacoesRes] = await Promise.all([
                    axios.get(`${API_URL}/resumo`),
                    axios.get(`${API_URL}/ranking`),
                    axios.get(`${API_URL}/resumoAvaliacoes`) // Ajuste o endpoint se for diferente
                ]);

                console.log('Dados do resumo:', resumoRes.data);
                console.log('Dados do ranking:', rankingRes.data);
                console.log('Dados das avaliações:', avaliacoesRes.data);

                setResumo(resumoRes.data);
                setRanking(rankingRes.data);
                setAvaliacoes(avaliacoesRes.data);
                
            } catch (err) {
                console.error('Erro ao buscar dados para o dashboard:', err);
                setError('Falha ao carregar dados do dashboard. Verifique os endpoints da API.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllDashboardData();
    }, []);

    if (loading) {
        return <main><p>Carregando dados do dashboard...</p></main>;
    }

    if (error) {
        return <main><p>Erro: {error}</p></main>;
    }
    
    // Verifica se todos os dados foram carregados antes de renderizar o componente Dashboard
    // Isso evita passar null para o componente Dashboard se alguma chamada falhar parcialmente
    // mas o Promise.all já rejeitaria se uma falhar, então o catch lidaria com isso.
    // No entanto, é uma boa prática garantir que os dados não sejam null.
    if (resumo === null || ranking === null || avaliacoes === null) {
        return <main><p>Aguardando dados completos do dashboard...</p></main>;
    }

    return (
        <main>
            <DashboardComponent
                resumo={resumo}
                ranking={ranking}
                avaliacoes={avaliacoes}
            />
        </main>
    );
}