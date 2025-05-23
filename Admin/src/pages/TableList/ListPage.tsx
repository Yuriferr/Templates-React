import { useEffect, useState } from 'react';
import axios from 'axios';
import TableList from '../../components/TableList/TableList';
import './ListPage.css';

export default function ListPage() {
    const [items, setItems] = useState<any[]>([]);
    const tableConfig = {
        title: "Avaliações",
        data: [
            { label: "id", type: "text" },
            { label: "dataCriacao", type: "text" },
            { label: "cliente", type: "text" },
            { label: "servicos", type: "text" },
            { label: "mediaAvaliacaoServicos", type: "number" },
            { label: "comentarioEstabelecimento", type: "text" },
            { label: "status", type: "text" }
        ]
    };

    useEffect(() => {
        axios.get('https://6830622ff504aa3c70f7997c.mockapi.io/api/v1/sac/reviews')
            .then(res => {
                // Flatten the data for the table
                const mapped = res.data.map((item: any) => ({
                    id: item.id,
                    dataCriacao: new Date(item.dataCriacao).toLocaleString('pt-BR'),
                    cliente: item.cliente?.nome,
                    servicos: item.servicos.map((s: any) => `${s.nome} (${s.nomeProfissional})`).join(', '),
                    mediaAvaliacaoServicos: item.mediaAvaliacaoServicos,
                    comentarioEstabelecimento: item.comentarioEstabelecimento,
                    status: item.status
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