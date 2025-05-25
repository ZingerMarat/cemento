import React from 'react';

export default function ColumnSelector({ columns, visibleColumns, onColumnToggle }) {
    return (
        <div>
            <h3>Column Selector</h3>
            {columns.map((column) => (
                <div key={column.id}>
                    <label>
                        <input type="checkbox" checked={visibleColumns.includes(column.id)} onChange={() => onColumnToggle(column.id)} />
                        {column.title}
                    </label>
                </div>
            ))}
        </div>
    );
}