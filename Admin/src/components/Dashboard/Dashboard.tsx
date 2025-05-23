import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="Dashboard">
            <h1>
                <span role="img" aria-label="dashboard">📊</span> Dashboard de Avaliações
            </h1>
            <section className="Dashboard-cards">
                <div>
                    <span>Média Estabelecimento</span>
                    <p className="Dashboard-value">
                        4.6 <span style={{ color: '#FFD700' }}>⭐</span>
                    </p>
                </div>
                <div>
                    <span>Clientes Avaliando</span>
                    <p className="Dashboard-value">182</p>
                </div>
                <div>
                    <span>Total de Comentários</span>
                    <p className="Dashboard-value">127</p>
                </div>
                <div>
                    <span>Melhor Profissional</span>
                    <p className="Dashboard-value" style={{ fontWeight: 700 }}>Almeida Teles</p>
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
                    <div>
                        <span>Almeida Teles — 4.8</span>
                        <div className="Dashboard-bar" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <span>Marcela Gomes — 4.7</span>
                        <div className="Dashboard-bar" style={{ width: '98%' }} />
                    </div>
                    <div>
                        <span>Jonas Lima — 4.5</span>
                        <div className="Dashboard-bar" style={{ width: '94%' }} />
                    </div>
                    <div>
                        <span>Tatiane Moura — 4.3</span>
                        <div className="Dashboard-bar" style={{ width: '90%' }} />
                    </div>
                </div>
            </section>

            <section className="Dashboard-recentes">
                <h2>Avaliações Recentes</h2>
                <ul>
                    <li>⭐ 5 - "Excelente atendimento!" — Rebeca</li>
                    <li>⭐ 4 - "Gostei muito, mas atrasou." — Carlos</li>
                    <li>⭐ 3 - "Esperava mais." — Juliana</li>
                </ul>
            </section>
        </div>
    );
}