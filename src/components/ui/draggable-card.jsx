import React, { useRef, useState } from 'react';

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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={cardRef}
      className={`cursor-grab active:cursor-grabbing transition-transform hover:scale-105 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: isDragging ? 50 : 10
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-white hover:border-cyan-200 transition-colors">
        {children}
      </div>
    </div>
  );
}
