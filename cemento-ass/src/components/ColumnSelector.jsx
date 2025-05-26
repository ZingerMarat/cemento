import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export default function ColumnSelector({ columns, visibleColumns, onColumnToggle, onOrderChange }) {
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
        <div style={{
            width: "200px",
            flexShrink: 0,
            position: "sticky",
            top: "20px",
            alignSelf: "flex-start"
        }}>
            <h3>Column Selector</h3>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
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