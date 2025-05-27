import React from 'react';
import TableCell from './TableCell';

export default function TableRow({ row, columns, onCellChange }) {
    return (
        <tr>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    column={column}
                    value={row[column.id]}  // value = row['name'] = 'John Doe'
                    onChange={(newValue) => onCellChange(row.id, column.id, newValue)} // onCellChange(1, 'name', 'Nico Nico')
                    style={cellStyles}
                />
            ))}
        </tr>
    );
}


const cellStyles = {
    backgroundColor: '#FF5F1F',
    color: '#000000',
    padding: '12px', //padding in the cell
    border: '2px solid #000000',
    textTransform: 'uppercase', //make the text uppercase
    letterSpacing: '0.5px', //spacing between the letters
    fontSize: '14px', //font size
    fontWeight: 'bold', //make the text bold
    position: 'relative', //make the cell relative
    textAlign: 'center' //center the text
}