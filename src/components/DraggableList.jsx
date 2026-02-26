import { useState } from 'react';

export function DraggableList({ items, onReorder, renderItem, keyExtractor }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index) => {
    setDragOverItem(index);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (index) => {
    if (draggedItem === null || draggedItem === index) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem];
    
    newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, draggedItemContent);

    onReorder(newItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={keyExtractor(item)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop(index)}
          className={`p-4 bg-white rounded-lg border-2 cursor-move transition-all ${
            draggedItem === index
              ? 'opacity-50 border-blue-500'
              : dragOverItem === index
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
            <div className="flex-1">
              {renderItem(item)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
