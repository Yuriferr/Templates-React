import React from 'react';
import TableList from '../../components/TableList/TableList';

export default function ListPage() {
    const tableConfig = {
        title: "Cadastro de Produtos",
        data: [
            { label: "Nome", type: "text" },
            { label: "Preço", type: "number" },
            { label: "Descrição", type: "text" }
            // Adicione mais campos se quiser
        ]
    };

    return (
        <main className='list-container'>
            <TableList {...tableConfig} />
        </main>
    );
}