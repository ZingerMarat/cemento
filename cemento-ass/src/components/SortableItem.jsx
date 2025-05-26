import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, title, checked, onChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#f0f0f0' : undefined,
        padding: '8px',
        marginBottom: '4px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                    e.stopPropagation();
                    onChange();
                }}
                style={{ cursor: 'pointer' }}
            />
            <span>{title}</span>
            <span style={{ marginLeft: 'auto' }}>⠿</span>
        </div>
    );
} 