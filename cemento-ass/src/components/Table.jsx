import React from 'react';
import TableRow from './TableRow';

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