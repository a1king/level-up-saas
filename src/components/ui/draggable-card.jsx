import React, { useRef, useState, useCallback } from 'react';

export function DraggableCardContainer({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

export function DraggableCardBody({ children, className = "" }) {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      requestAnimationFrame(() => {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={cardRef}
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: isDragging ? 1000 : 10
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition-all duration-300 hover:scale-105">
        {children}
      </div>
    </div>
  );
}
