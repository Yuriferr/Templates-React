import React, { useState } from 'react';
import Forms from '../Forms/Forms';
import './TableList.css';

interface Field {
    label: string;
    type: string;
}

interface TableListProps {
    title: string;
    data: Field[];
}

interface Item {
    id: number;
    [key: string]: any;
    editavel: boolean;
}

export default function TableList({ title, data }: TableListProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<{ [key: string]: any }>({});

    function handleAdd(values: { [key: string]: any }) {
        const newItem: Item = {
            id: Date.now(),
            ...values,
            editavel: values.editavel ?? true,
        };
        setItems([...items, newItem]);
    }

    function handleEditChange(label: string, value: any) {
        setEditForm({ ...editForm, [label]: value });
    }

    function handleEdit(item: Item) {
        setEditId(item.id);
        setEditForm(item);
    }

    function handleSave(id: number) {
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

    // Campos para o Forms, incluindo o checkbox de edição
    const formFields = [
        ...data.map(field => ({
            label: field.label,
            name: field.label,
            type: field.type,
        })),
        {
            label: "Permitir edição",
            name: "editavel",
            type: "checkbox"
        }
    ];

    return (
        <div className='TableList'>
            <h2>{title}</h2>
            <Forms
                title=""
                fields={formFields}
                buttonLabel="Salvar"
                onSubmit={handleAdd}
            />
            <table>
                <thead>
                    <tr>
                        {data.map(field => (
                            <th key={field.label}>{field.label}</th>
                        ))}
                        <th>Permitir edição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            {editId === item.id ? (
                                <>
                                    {data.map(field => (
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
                                        <input
                                            type="checkbox"
                                            checked={!!editForm.editavel}
                                            onChange={e =>
                                                setEditForm({ ...editForm, editavel: e.target.checked })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleSave(item.id)}>Salvar</button>
                                        <button onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    {data.map(field => (
                                        <td key={field.label}>{item[field.label]}</td>
                                    ))}
                                    <td>
                                        <input type="checkbox" checked={!!item.editavel} disabled />
                                    </td>
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