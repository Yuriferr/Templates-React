import React, { useState } from 'react';
import './TableList.css';

interface Produto {
    id: number;
    nome: string;
    valor: number;
    editavel: boolean;
}

export default function TableList() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState<number | ''>('');
    const [editavel, setEditavel] = useState(true);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState('');
    const [editValor, setEditValor] = useState<number | ''>('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (nome && valor !== '') {
            const novoProduto: Produto = {
                id: Date.now(),
                nome,
                valor: Number(valor),
                editavel,
            };
            setProdutos([...produtos, novoProduto]);
            setNome('');
            setValor('');
            setEditavel(true);
        }
    }

    function handleEdit(id: number, nome: string, valor: number) {
        setEditId(id);
        setEditNome(nome);
        setEditValor(valor);
    }

    function handleSave(id: number) {
        setProdutos(produtos.map(prod =>
            prod.id === id ? { ...prod, nome: editNome, valor: Number(editValor) } : prod
        ));
        setEditId(null);
        setEditNome('');
        setEditValor('');
    }

    function handleCancel() {
        setEditId(null);
        setEditNome('');
        setEditValor('');
    }

    return (
        <main className='list-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Nome do Produto'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='Valor do Produto'
                    value={valor}
                    onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                />
                <label className='checkbox'>
                    <input
                        type="checkbox"
                        checked={editavel}
                        onChange={e => setEditavel(e.target.checked)}
                    />
                    Permitir edição
                </label>
                <button type='submit'>Salvar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            {editId === produto.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editNome}
                                            onChange={e => setEditNome(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editValor}
                                            onChange={e => setEditValor(e.target.value === '' ? '' : Number(e.target.value))}
                                        />
                                    </td>
                                    <td className='actions'>
                                        <button className='btn-confirm' onClick={() => handleSave(produto.id)}>Salvar</button>
                                        <button className='btn-danger' onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{produto.nome}</td>
                                    <td>{produto.valor}</td>
                                    <td>
                                        {produto.editavel && (
                                            <button onClick={() => handleEdit(produto.id, produto.nome, produto.valor)}>Editar</button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}