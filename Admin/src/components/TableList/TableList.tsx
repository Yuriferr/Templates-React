import { useState, useEffect } from 'react';
import axios from 'axios';
import './TableList.css'

const tableConfig = {
    title: "Avaliações",
    entity: "reviews",
    data: [
        { label: "dataCriacao", type: "text", display: "Data" },
        { label: "cliente", type: "text", display: "Cliente" },
        { label: "servicos", type: "text", display: "Serviços" },
        { label: "mediaAvaliacaoServicos", type: "number", display: "Média" },
        { label: "comentarioEstabelecimento", type: "text", display: "Comentário" },
        { label: "status", type: "text", display: "Status" }
    ]
};

interface Item {
    id: number | string;
    [key: string]: any;
    editavel?: boolean;
}

type SortConfig = {
    key: string;
    direction: 'asc' | 'desc';
} | null;

export default function TableList() {
    const API_URL = import.meta.env.VITE_API_URL || '';
    const [items, setItems] = useState<Item[]>([]);
    const [editId, setEditId] = useState<number | string | null>(null);
    const [editForm, setEditForm] = useState<{ [key: string]: any }>({});
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    useEffect(() => {
        axios.get(`${API_URL}/${tableConfig.entity}`)
            .then(res => {
                const mapped = res.data.map((item: any) => ({
                    id: item.id,
                    dataCriacao: item.dataCriacao ? new Date(item.dataCriacao).toLocaleString('pt-BR').replace(',', '') : '',
                    cliente: item.cliente?.nome,
                    servicos: item.servicos?.map((s: any) => `${s.nome} (${s.nomeProfissional})`).join(', '),
                    mediaAvaliacaoServicos: item.mediaAvaliacaoServicos,
                    comentarioEstabelecimento: item.comentarioEstabelecimento,
                    status: item.status,
                    editavel: false
                }));
                setItems(mapped);
            })
            .catch(() => setItems([]));
    }, []);

    function handleEditChange(label: string, value: any) {
        setEditForm({ ...editForm, [label]: value });
    }

    function handleEdit(item: Item) {
        setEditId(item.id);
        setEditForm(item);
    }

    function handleSave(id: number | string) {
        setItems(items.map(item =>
            item.id === id ? { ...item, ...editForm } : item
        ));
        setEditId(null);
        setEditForm({});
    }

    function handleCancel() {
        setEditId(null);
        setEditForm({});
    }

    function handleSort(key: string) {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }

    const visibleFields = tableConfig.data.filter(field => field.label !== 'id');

    let sortedItems = [...items];
    if (sortConfig) {
        sortedItems.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue === undefined || bValue === undefined) return 0;
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return sortConfig.direction === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    }

    return (
        <div className='TableList'>
            <h2>{tableConfig.title}</h2>
            <table>
                <thead>
                    <tr>
                        {visibleFields.map(field => (
                            <th
                                key={field.label}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort(field.label)}
                            >
                                {field.display || field.label}
                                {sortConfig?.key === field.label ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''}
                            </th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id}>
                            {editId === item.id ? (
                                <>
                                    {visibleFields.map(field => (
                                        <td key={field.label}>
                                            <input
                                                type={field.type}
                                                value={editForm[field.label] ?? ''}
                                                onChange={e =>
                                                    handleEditChange(
                                                        field.label,
                                                        field.type === 'checkbox'
                                                            ? e.currentTarget.checked
                                                            : e.currentTarget.value
                                                    )
                                                }
                                            />
                                        </td>
                                    ))}
                                    <td>
                                        <button onClick={() => handleSave(item.id)}>Salvar</button>
                                        <button onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    {visibleFields.map(field => (
                                        <td key={field.label}>{item[field.label]}</td>
                                    ))}
                                    <td>
                                        {item.editavel && (
                                            <button onClick={() => handleEdit(item)}>Editar</button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}