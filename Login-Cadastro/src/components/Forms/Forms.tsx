import React, { useState } from 'react';
import './Forms.css';

interface Field {
    label: string;
    name: string;
    type: string;
}

interface FormsProps {
    title: string;
    fields: Field[];
    buttonLabel: string;
    onSubmit: (values: { [key: string]: any }) => void;
}

export default function Forms({ title, fields, buttonLabel, onSubmit }: FormsProps) {
    const [form, setForm] = useState<{ [key: string]: any }>({});

    function handleChange(name: string, value: any) {
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
    <form className='Forms' onSubmit={handleSubmit}>
        <h1>{title}</h1>
        {fields.map(field => (
            <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={field.type === 'checkbox' ? undefined : form[field.name] ?? ''}
                    checked={field.type === 'checkbox' ? !!form[field.name] : undefined}
                    onChange={e =>
                        handleChange(
                            field.name,
                            field.type === 'checkbox'
                                ? e.currentTarget.checked
                                : e.currentTarget.value
                        )
                    }
                />
            </div>
        ))}
        <button type="submit">{buttonLabel}</button>
    </form>
);
}