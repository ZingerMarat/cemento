import React from 'react';

const inputStyles = {
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#000000',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    outline: 'none'
};

//renderers for different column types
const cellRenderers = {
    string: ({ value, onChange }) => (
        <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            style={inputStyles}
        />
    ),
    number: ({ value, onChange }) => (
        <input 
            type="number" 
            value={value || ''} 
            onChange={(e) => onChange(Number(e.target.value))}
            style={inputStyles}
        />
    ),
    boolean: ({ value, onChange }) => (
        <input 
            type="checkbox" 
            checked={Boolean(value)} 
            onChange={(e) => onChange(e.target.checked)}
            style={{
                ...inputStyles,
                width: 'auto',
                cursor: 'pointer',
                accentColor: '#000000'
            }}
        />
    ),
    email: ({ value, onChange }) => (
        <input 
            type="email" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            style={inputStyles}
        />
    ),
    select: ({ value, onChange, column }) => (
        <select 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            style={{
                ...inputStyles,
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
            }}
        >
            {column.options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    ),
};

export default function TableCell({ column, value, onChange, style }) {
    //use renderer for the column type or default to string renderer
    const renderer = cellRenderers[column.type] || cellRenderers.string;
    
    return <td style={style}>{renderer({ value, onChange, column })}</td>;
}