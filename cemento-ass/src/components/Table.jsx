import React from 'react';
import TableRow from './TableRow';

export default function Table({columns, data, onCellChange}) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th 
                            key={column.id}
                            style={{
                                backgroundColor: '#FF5F1F',
                                color: '#000000',
                                padding: '12px',
                                border: '2px solid #000000',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontSize: '14px',
                                fontWeight: '900',
                                position: 'relative',
                                boxShadow: '2px 2px 0 #000000'
                            }}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
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