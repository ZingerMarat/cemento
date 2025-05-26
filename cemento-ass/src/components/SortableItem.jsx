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
        backgroundColor: '#FF5F1F',
        padding: '12px',
        marginBottom: '12px',
        cursor: 'grab',
        borderRadius: '0',
        border: '2px solid #000000',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none',
        boxShadow: isDragging ? 'none' : '4px 4px 0 #000000',
        position: 'relative',
        top: isDragging ? '2px' : '0',
        left: isDragging ? '2px' : '0'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#000000'
                }}
            />
            <span style={{ 
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                {title}
            </span>
            <span style={{ 
                marginLeft: 'auto', 
                color: '#000000', 
                fontSize: '16px',
                fontWeight: 'bold'
            }}>⠿</span>
        </div>
    );
} 