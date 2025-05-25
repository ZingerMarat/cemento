import React from 'react';
import TableCell from './TableCell';

export default function Table({columns, data, onCellChange}) {
    
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.id}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((column) => (
                                <TableCell key={column.id} column={column} value={row[column.id]} onChange={(newValue) => onCellChange(row.id, column.id, newValue)}/>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}