import React from 'react';

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
            style={{...inputStyles, width: 'auto', cursor: 'pointer', accentColor: '#000000'}}
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
                cursor: 'pointer', //make the cursor a pointer
                appearance: 'none', //remove the default appearance in the select
                WebkitAppearance: 'none', // same for Chrome/Safary
            }}
        >
            {column.options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    ),
    button: ({ value }) => (
        <button onClick={() => console.log('button clicked')}>
            {value}
        </button>
    ),    
};

export default function TableCell({ column, value, onChange, style }) {

    //use renderer for the column type or default to string renderer
    const renderer = cellRenderers[column.type] || cellRenderers.string;
    
    return (
        <td style={{...style}}>
            {renderer({ value, onChange, column })}
        </td>
    );
}

const inputStyles = {
    width: '100%',
    maxWidth: '100%', //make the input take the full width of the cell
    boxSizing: 'border-box',
    background: 'none', //remove background in the input
    border: 'none', //remove border in the input
    color: '#000000', //make the text black
    fontSize: '12px',
    fontWeight: 'bold', //make the text bold
    textAlign: 'center', //center the text
    textTransform: 'uppercase', //make the text uppercase
    outline: 'none', //remove the outline in the input
    padding: '0 8px', //padding in the input
    whiteSpace: 'nowrap', //make the text nowrap
    overflow: 'hidden', //hide the overflow in the input
    textOverflow: 'ellipsis' //add ellipsis to the overflow in the input
};