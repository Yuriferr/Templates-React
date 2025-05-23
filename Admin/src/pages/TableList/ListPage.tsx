import { useEffect, useState } from 'react';
import axios from 'axios';
import TableList from '../../components/TableList/TableList';
import { useNavigate } from 'react-router-dom';

export default function ListPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    // Tradução dos campos
    const tableConfig = {
        title: "Avaliações",
        data: [
            { label: "dataCriacao", type: "text", display: "Data" },
            { label: "cliente", type: "text", display: "Cliente" },
            { label: "servicos", type: "text", display: "Serviços" },
            { label: "mediaAvaliacaoServicos", type: "number", display: "Média" },
            { label: "comentarioEstabelecimento", type: "text", display: "Comentário" },
            { label: "status", type: "text", display: "Status" }
        ]
    };

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (!login) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        axios.get('https://6830622ff504aa3c70f7997c.mockapi.io/api/v1/sac/reviews')
            .then(res => {
                const mapped = res.data.map((item: any) => ({
                    id: item.id,
                    dataCriacao: new Date(item.dataCriacao).toLocaleString('pt-BR').replace(',', ''),
                    cliente: item.cliente?.nome,
                    servicos: item.servicos.map((s: any) => `${s.nome} (${s.nomeProfissional})`).join(', '),
                    mediaAvaliacaoServicos: item.mediaAvaliacaoServicos,
                    comentarioEstabelecimento: item.comentarioEstabelecimento,
                    status: item.status,
                    editavel: false // Todos vindos da API não são editáveis
                }));
                setItems(mapped);
            })
            .catch(() => setItems([]));
    }, []);

    return (
        <main className='list-container'>
            <TableList {...tableConfig} items={items} />
        </main>
    );
}