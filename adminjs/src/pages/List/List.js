import axios from "axios";
import { useEffect, useState } from "react";
import TableList from "../../components/TableList/TableList"; // Verifique o caminho correto

// Função para capitalizar a primeira letra e adicionar espaços
function formatDisplayLabel(key) {
    if (!key) return '';
    // Adiciona espaço antes de letras maiúsculas, exceto no início da string
    const result = key.replace(/([A-Z])/g, ' $1').trim();
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function List() {
    const [listData, setListData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            console.error("REACT_APP_API_URL não está definida nas variáveis de ambiente.");
            setError("Configuração de API ausente.");
            setLoading(false);
            return;
        }

        // Ajuste o endpoint se necessário. Ex: `${apiUrl}/reviews`
        // Se a URL no .env já é o endpoint completo (ex: .../sac), remova o /reviews
        axios.get(`${apiUrl}/reviews`) 
            .then(response => {
                console.log("Dados recebidos da API:", response.data);
                const data = response.data || [];
                setListData(data);

                if (data.length > 0) {
                    const firstItem = data[0];
                    const generatedColumns = Object.keys(firstItem).map(key => ({
                        label: key,
                        display: formatDisplayLabel(key), // Formata o nome da chave para exibição
                        sortable: true, // Habilita ordenação por padrão
                        render: (value, item) => { // Adicionado 'item' para acesso a outros campos se necessário
                            // Tratamento específico por chave
                            if (key === "dataCriacao" || key === "dataUltimaAtualizacao") {
                                return value ? new Date(value).toLocaleString() : '-'; // Formato de data e hora local
                            }
                            if (key === "cliente") {
                                return value && typeof value === 'object' && value.nome ? value.nome : (typeof value === 'string' ? value : JSON.stringify(value));
                            }
                            if (key === "servicos") {
                                if (Array.isArray(value) && value.length > 0) {
                                    return value.map(servico => servico.nome || JSON.stringify(servico)).join(', ');
                                }
                                return Array.isArray(value) && value.length === 0 ? 'Nenhum' : JSON.stringify(value);
                            }
                            // Tratamento genérico para outros tipos
                            if (value instanceof Date) { // Fallback se não for uma das chaves acima
                                return value.toLocaleDateString();
                            }
                            if (typeof value === 'object' && value !== null) {
                                return JSON.stringify(value); // Fallback para outros objetos
                            }
                            return String(value ?? '-'); // Trata null/undefined para strings e números
                        }
                    }));
                    setColumns(generatedColumns);
                } else {
                    setColumns([]); // Define colunas vazias se não houver dados
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar dados da API:", err);
                setError("Falha ao carregar dados.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <main><p>Carregando dados...</p></main>;
    }

    if (error) {
        return <main><p>Erro: {error}</p></main>;
    }

    if (listData.length === 0 && !loading) {
        return <main><p>Nenhum dado encontrado.</p></main>;
    }

    return (
        <main>
            <h1>Lista de Registros (API)</h1>
            <TableList
                title="Dados da API"
                columns={columns}
                data={listData}
            />
        </main>
    );
}