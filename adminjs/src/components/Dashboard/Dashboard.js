import './Dashboard.css'; // Certifique-se de que este arquivo CSS exista

// Removido useState, useEffect, axios daqui

export default function Dashboard({ resumo, ranking, avaliacoes }) {
    // A lógica de loading e error será tratada pela página pai

    // Se os dados não forem passados, podemos definir valores padrão para evitar erros
    const safeResumo = resumo || {
        mediaEstabelecimento: 0,
        clientesAvaliando: 0,
        totalComentarios: 0,
        melhorProfissional: ''
    };
    const safeRanking = ranking || [];
    const safeAvaliacoes = avaliacoes || [];

    const rankingTop3 = safeRanking.slice(0, 3);

    return (
        <div className="Dashboard">
            <h1>
                <span role="img" aria-label="dashboard">📊</span> Dashboard de Avaliações
            </h1>
            <section className="Dashboard-cards">
                <div>
                    <span>Média Estabelecimento</span>
                    <p className="Dashboard-value">
                        {safeResumo.mediaEstabelecimento ? safeResumo.mediaEstabelecimento.toFixed(1) : 'N/A'} <span style={{ color: '#FFD700' }}>⭐</span>
                    </p>
                </div>
                <div>
                    <span>Clientes Avaliando</span>
                    <p className="Dashboard-value">{safeResumo.clientesAvaliando ?? 'N/A'}</p>
                </div>
                <div>
                    <span>Total de Comentários</span>
                    <p className="Dashboard-value">{safeResumo.totalComentarios ?? 'N/A'}</p>
                </div>
                <div>
                    <span>Melhor Profissional</span>
                    <p className="Dashboard-value" style={{ fontWeight: 700 }}>{safeResumo.melhorProfissional || 'N/A'}</p>
                </div>
            </section>

            <section className="Dashboard-tendencia">
                <h2>Tendência de Avaliações</h2>
                <div>
                    {/* Substitua por um componente de gráfico real se tiver um */}
                    <p>[Gráfico de linhas simulado - Implementar com biblioteca de gráficos]</p>
                    <ul>
                        <li>Mai - Estabelecimento: 4.5 | Profissionais: 4.4</li>
                        <li>Jun - Estabelecimento: 4.6 | Profissionais: 4.5</li>
                        <li>Jul - Estabelecimento: 4.3 | Profissionais: 4.2</li>
                        <li>Ago - Estabelecimento: 4.7 | Profissionais: 4.6</li>
                    </ul>
                </div>
            </section>

            <section className="Dashboard-ranking">
                <h2>Ranking de Profissionais (Top 3)</h2>
                {rankingTop3.length > 0 ? (
                    <div className="Dashboard-bars">
                        {rankingTop3.map(profissional => (
                            <div key={profissional.nome || profissional.id}> {/* Adicionado fallback para key */}
                                <span>{profissional.nome || 'Profissional Desconhecido'} — {profissional.nota ? profissional.nota.toFixed(1) : 'N/A'}</span>
                                <div 
                                    className="Dashboard-bar" 
                                    style={{ width: profissional.nota ? `${(profissional.nota / 5) * 100}%` : '0%' }} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum dado de ranking disponível.</p>
                )}
            </section>

            <section className="Dashboard-recentes">
                <h2>Avaliações Recentes (Últimas 3)</h2>
                {safeAvaliacoes.length > 0 ? (
                    <ul>
                        {safeAvaliacoes.slice(0, 3).map((avaliacao, index) => (
                            <li key={avaliacao.id || index}> {/* Adicionado fallback para key */}
                                ⭐ {avaliacao.nota ?? 'N/A'} - "{avaliacao.comentario || 'Sem comentário'}" — {avaliacao.cliente || 'Cliente Anônimo'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma avaliação recente encontrada.</p>
                )}
            </section>
        </div>
    );
}