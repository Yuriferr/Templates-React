import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

interface Resumo {
    mediaEstabelecimento: number;
    clientesAvaliando: number;
    totalComentarios: number;
    melhorProfissional: string;
}

interface Ranking {
    nome: string;
    nota: number;
    totalAvaliacoes: number;
}

interface Avaliacao {
    categoria: string;
    nota: number;
    comentario: string;
    cliente: string;
}

export default function Dashboard() {
    const [resumo, setResumo] = useState<Resumo>({
        mediaEstabelecimento: 0,
        clientesAvaliando: 0,
        totalComentarios: 0,
        melhorProfissional: ''
    });
    const [ranking, setRanking] = useState<Ranking[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;

        axios.get(`${API_URL}/resumo`)
            .then(response => {
                setResumo(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar resumo:', error);
            });

        axios.get(`${API_URL}/ranking`)
            .then(response => {
                setRanking(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar ranking:', error);
            });

        axios.get(`${API_URL}/resumoAvaliacoes`)
            .then(response => {
                setAvaliacoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar avaliações:', error);
            });
    }, []);

    const rankingTop3 = ranking.slice(0, 3);

    return (
        <div className="Dashboard">
            <h1>
                <span role="img" aria-label="dashboard">📊</span> Dashboard de Avaliações
            </h1>
            <section className="Dashboard-cards">
                <div>
                    <span>Média Estabelecimento</span>
                    <p className="Dashboard-value">
                        {resumo.mediaEstabelecimento} <span style={{ color: '#FFD700' }}>⭐</span>
                    </p>
                </div>
                <div>
                    <span>Clientes Avaliando</span>
                    <p className="Dashboard-value">{resumo.clientesAvaliando}</p>
                </div>
                <div>
                    <span>Total de Comentários</span>
                    <p className="Dashboard-value">{resumo.totalComentarios}</p>
                </div>
                <div>
                    <span>Melhor Profissional</span>
                    <p className="Dashboard-value" style={{ fontWeight: 700 }}>{resumo.melhorProfissional}</p>
                </div>
            </section>

            <section className="Dashboard-tendencia">
                <h2>Tendência de Avaliações</h2>
                <div>
                    [Gráfico de linhas simulado]
                    <ul>
                        <li>Mai - Estabelecimento: 4.5 | Profissionais: 4.4</li>
                        <li>Jun - Estabelecimento: 4.6 | Profissionais: 4.5</li>
                        <li>Jul - Estabelecimento: 4.3 | Profissionais: 4.2</li>
                        <li>Ago - Estabelecimento: 4.7 | Profissionais: 4.6</li>
                    </ul>
                </div>
            </section>

            <section className="Dashboard-ranking">
                <h2>Ranking de Profissionais</h2>
                <div className="Dashboard-bars">
                    {rankingTop3.map(profissional => (
                        <div key={profissional.nome}>
                            <span>{profissional.nome} — {profissional.nota}</span>
                            <div className="Dashboard-bar" style={{ width: `${(profissional.nota / 5) * 100}%` }} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="Dashboard-recentes">
                <h2>Avaliações Recentes</h2>
                <ul>
                    {avaliacoes.slice(0, 3).map((avaliacao, index) => (
                        <li key={index}>⭐ {avaliacao.nota} - "{avaliacao.comentario}" — {avaliacao.cliente}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}