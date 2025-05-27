import React from 'react';
import TableRow from './TableRow';

export default function Table({columns, data}) {
    return (
        <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', //border of cells like one line
            tableLayout: 'fixed' //size of the table is fixed with the width of the table
        }}>

            <colgroup>
                {columns.map(column => (
                    <col 
                    key={column.id}
                    style={{ width: column.width ? `${column.width}px` : 'auto' }}
                    />
                ))}
            </colgroup>

            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.id} style={tableHeaderCellStyles}>
                            {column.title}
                        </th>
                    ))}
                </tr>
                {/* Spacer row */}
                <tr style={{ height: '20px' }}>
                    <td colSpan={columns.length}></td>
                </tr>
            </thead>

            <tbody>
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                    />
                ))}
            </tbody>
        </table>
    );
}


const tableHeaderCellStyles = {
        backgroundColor: '#FF5F1F',
        color: '#000000', // text color
        padding: '12px', // padding in the cell
        margin: '0 0 20px 0', // margin in the cell
        border: '2px solid #000000', // border in the cell
        boxShadow: '4px 4px 0 #000000', // shadow in the cell
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontSize: '16px',
        fontWeight: 'bold',    
}