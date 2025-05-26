import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export default function ColumnSelector({ 
    columns, 
    visibleColumns, 
    onColumnToggle, 
    onOrderChange,
    onDragStart,
    onDragEnd 
}) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        onDragEnd();
        
        if (active.id !== over.id) {
            const oldIndex = columns.findIndex(col => col.id === active.id);
            const newIndex = columns.findIndex(col => col.id === over.id);
            onOrderChange(arrayMove(columns, oldIndex, newIndex));
        }
    };

    const handleCheckboxChange = (columnId) => {
        onColumnToggle(columnId);
    };

    return (
        <div>
            <h3 style={{
                backgroundColor: '#FF5F1F',
                color: '#000000',
                padding: '12px',
                margin: '0 0 20px 0',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 #000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Column Selector</h3>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={onDragStart}
            >
                <SortableContext
                    items={columns.map(col => col.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {columns.map((column) => (
                        <SortableItem
                            key={column.id}
                            id={column.id}
                            checked={visibleColumns.includes(column.id)}
                            onChange={() => handleCheckboxChange(column.id)}
                            title={column.title}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
} 