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
                />
            ))}
        </tr>
    );
}