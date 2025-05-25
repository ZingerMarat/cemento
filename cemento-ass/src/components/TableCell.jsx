import React from 'react';

//renderers for different column types
const cellRenderers = {
    string: ({ value, onChange }) => (
                                        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    ),
    number: ({ value, onChange }) => (
                                        <input type="number" value={value || ''} onChange={(e) => onChange(Number(e.target.value))} />
    ),
    boolean: ({ value, onChange }) => (
                                        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
    ),
    email: ({ value, onChange }) => (
                                        <input type="email" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    ),
    select: ({ value, onChange, column }) => (
                                        <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
                                            {column.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
    ),
};

export default function TableCell({ column, value, onChange }) {
    //use renderer for the column type or default to string renderer
    const renderer = cellRenderers[column.type] || cellRenderers.string;
    
    return <td>{renderer({ value, onChange, column })}</td>;
}