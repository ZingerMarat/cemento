import React from 'react';
import TableRow from './TableRow';

export default function Table({columns, data, onCellChange}) {
    return (
        <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            tableLayout: 'fixed'
        }}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th 
                            key={column.id}
                            style={{
                                backgroundColor: '#FF5F1F',
                                color: '#000000',
                                padding: '12px',
                                margin: '0 0 20px 0',
                                border: '2px solid #000000',
                                boxShadow: '4px 4px 0 #000000',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
                <tr style={{ height: '20px' }}><td colSpan={columns.length}></td></tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                        onCellChange={onCellChange}
                    />
                ))}
            </tbody>
        </table>
    );
}