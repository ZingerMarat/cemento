import React from 'react';
import TableCell from './TableCell';

export default function TableRow({ row, columns, onCellChange }) {
    return (
        <tr>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    column={column}
                    value={row[column.id]}
                    onChange={(newValue) => onCellChange(row.id, column.id, newValue)}
                    style={{
                        backgroundColor: '#FF5F1F',
                        color: '#000000',
                        padding: '12px',
                        border: '2px solid #000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        position: 'relative',
                        boxShadow: '2px 2px 0 #000000',
                        textAlign: 'center'
                    }}
                />
            ))}
        </tr>
    );
}