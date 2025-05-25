import React from 'react';
import TableCell from './TableCell';

export default function Table({columns, data}) {
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
                            <td key={column.id}>
                                <TableCell column={column} value={row[column.id]} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}